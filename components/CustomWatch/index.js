import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import "@splidejs/react-splide/css";
import "./style.scss";

import { getWatchBeltUrl, getWatchScreenUrl } from "@/functions/watchFucntions";

function CustomWatch(props) {
	const { activeOptionTab } = props;
	return (
		<div className="customization-ctn">
			{activeOptionTab === "size" && <SizeSelector key="size" {...props} />}
			{activeOptionTab === "case" && <CaseSelector key="case" {...props} />}
			{activeOptionTab === "band" && <BandSelector key="band" {...props} />}
		</div>
	);
}

function BandSelector({
	selectedOption,
	currentWatch,
	setCurrentWatch,
	isSideViewActive,
	setSideViewActive,
	newOptionId,
}) {
	const splideRef = useRef(null);
	const [activeSlideIdx, setActiveSlideIdx] = useState(0);

	const options = {
		start: 1,
		snap: true,
		perMove: 1,
		drag: "free",
		arrows: true,
		type: "slide",
		focus: "center",
		trimSpace: false,
		autoWidth: true,
		pagination: false,
	};

	const allVariants = [];
	let variantIndex = 0;

	selectedOption.variants.forEach((parentVariant) => {
		parentVariant.variants.forEach((variant) => {
			allVariants.push({
				...variant,
				parentVariantId: parentVariant.id,
			});

			if (currentWatch.bandVariant === variant.id && currentWatch.band === parentVariant.id) {
				options.start = variantIndex;
			}

			variantIndex = variantIndex + 1;
		});
	});

	const onSlideClick = (idx) => splideRef.current.go(idx);

	const onMove = (newSlide, newIdx, prevIdx) => {
		const variant = allVariants[newIdx];

		setCurrentWatch({
			...currentWatch,
			band: variant.parentVariantId,
			bandVariant: variant.id,
		});

		setSideViewActive(false);
	};

	useEffect(() => {
		setActiveSlideIdx(splideRef.current.splide.index);
		return () => setActiveSlideIdx(1);
	}, [isSideViewActive]);

	useEffect(() => {
		if (newOptionId) {
			const idx = allVariants.findIndex((v) => v.parentVariantId === newOptionId);
			if (idx !== -1) onSlideClick(idx);
		}
	}, [newOptionId]);

	return (
		<div className="custom-watch" data-animation="fade-in-500ms">
			<Splide
				onMove={onMove}
				ref={splideRef}
				hasTrack={false}
				options={options}
				className="band-slider"
			>
				<SplideTrack className="band-track">
					{allVariants.map((variant, idx) => (
						<SplideSlide
							key={idx}
							className="band-slide"
							data-side-active={activeSlideIdx === idx && isSideViewActive}
						>
							<div className="band-ctn" onClick={() => onSlideClick(idx)}>
								<Image
									data-animation="fade-in-500ms"
									src={getWatchBeltUrl({
										watchSize: currentWatch.size,
										watchBand: variant.parentVariantId,
										watchBandVariant: variant.id,
									})}
									width={1000}
									height={1000}
									priority={true}
									className="band-img"
									alt="band"
								/>
							</div>
						</SplideSlide>
					))}
				</SplideTrack>

				<Image
					src={getWatchScreenUrl({
						watchSize: currentWatch.size,
						watchCase: currentWatch.case,
						watchCaseVariant: currentWatch.caseVariant,
					})}
					data-hidden={isSideViewActive}
					width={1000}
					height={1000}
					loading="lazy"
					className="case-img"
					alt="case"
				/>
				<SplideArrows />
			</Splide>
		</div>
	);
}

function CaseSelector({
	selectedOption,
	currentWatch,
	setCurrentWatch,
	isSideViewActive,
	newOptionId,
}) {
	const [activeSlideIdx, setActiveSlideIdx] = useState(0);
	const splideRef = useRef(null);

	const options = {
		start: 1,
		snap: true,
		perMove: 1,
		drag: "free",
		arrows: true,
		type: "slide",
		focus: "center",
		autoWidth: true,
		pagination: false,
	};

	const allVariants = [];
	let variantIndex = 0;

	selectedOption.variants.forEach((parentVariant) => {
		parentVariant.variants.forEach((variant) => {
			allVariants.push({
				...variant,
				parentVariantId: parentVariant.id,
			});

			if (currentWatch.caseVariant === variant.id) {
				options.start = variantIndex;
			}

			variantIndex = variantIndex + 1;
		});
	});

	const onSlideClick = (idx) => splideRef.current.go(idx);

	const onMove = (newSlide, newIdx, prevIdx) => {
		const variant = allVariants[newIdx];

		setCurrentWatch({
			...currentWatch,
			case: variant.parentVariantId,
			caseVariant: variant.id,
		});
	};

	useEffect(() => {
		setActiveSlideIdx(splideRef.current.splide.index);
		return () => setActiveSlideIdx(1);
	}, [isSideViewActive]);

	useEffect(() => {
		if (newOptionId) {
			const idx = allVariants.findIndex((v) => v.parentVariantId === newOptionId);
			if (idx !== -1) onSlideClick(idx);
		}
	}, [newOptionId]);

	return (
		<div className="custom-watch" data-animation="fade-in-500ms">
			<Splide
				hasTrack={false}
				ref={splideRef}
				options={options}
				className="case-slider"
				onMove={onMove}
			>
				<SplideTrack className="case-track">
					{allVariants.map((variant, idx) => (
						<SplideSlide
							key={idx}
							className="case-slide"
							data-side-active={activeSlideIdx === idx && isSideViewActive}
						>
							<div className="case-ctn" onClick={() => onSlideClick(idx)}>
								<Image
									src={getWatchScreenUrl({
										watchSize: currentWatch.size,
										watchCase: variant.parentVariantId,
										watchCaseVariant: variant.id,
									})}
									width={1000}
									height={1000}
									priority={true}
									className="case-img"
									alt="case"
								/>
							</div>
						</SplideSlide>
					))}
				</SplideTrack>

				<Image
					src={getWatchBeltUrl({
						watchSize: currentWatch.size,
						watchBand: currentWatch.band,
						watchBandVariant: currentWatch.bandVariant,
					})}
					data-hidden={isSideViewActive}
					width={1000}
					height={1000}
					loading="lazy"
					className="band-img"
					alt="band"
				/>

				<SplideArrows />
			</Splide>
		</div>
	);
}

function SizeSelector({
	selectedOption,
	currentWatch,
	setCurrentWatch,
	isSideViewActive,
	newOptionId,
}) {
	const [activeSlideIdx, setActiveSlideIdx] = useState(0);
	const splideRef = useRef(null);
	const sizeSlideOptions = {
		start: 0,
		snap: true,
		perPage: 5,
		perMove: 1,
		drag: "free",
		arrows: true,
		type: "slide",
		focus: "center",
		fixedWidth: 306,
		pagination: false,
	};

	const allVarients = selectedOption.variants;
	const varientIndex = allVarients.findIndex((v) => v.id === currentWatch.size);
	sizeSlideOptions.start = varientIndex;

	const onSlideClick = (idx) => splideRef.current.go(idx);

	const onMove = (newSlide, newIdx, prevIdx) => {
		const variant = selectedOption.variants[newIdx];

		setCurrentWatch({
			...currentWatch,
			size: variant.id,
		});
	};

	useEffect(() => {
		setActiveSlideIdx(splideRef.current.splide.index);
		return () => setActiveSlideIdx(1);
	}, [isSideViewActive]);

	useEffect(() => {
		if (newOptionId) {
			const idx = allVarients.findIndex((v) => v.id === newOptionId);
			if (idx !== -1) onSlideClick(idx);
		}
	}, [newOptionId]);

	return (
		<div className="custom-watch" data-animation="fade-in-500ms">
			<Splide
				ref={splideRef}
				hasTrack={false}
				options={sizeSlideOptions}
				className="size-slider"
				onMove={onMove}
			>
				<SplideTrack>
					{selectedOption.variants.map((variant, idx) => (
						<SplideSlide
							key={variant.id}
							className="size-slide"
							data-side-active={activeSlideIdx === idx && isSideViewActive}
						>
							<div className="watch-ctn" onClick={() => onSlideClick(idx)}>
								<Image
									src={getWatchBeltUrl({
										watchSize: variant.id,
										watchBand: currentWatch.band,
										watchBandVariant: currentWatch.bandVariant,
									})}
									width={1000}
									height={1000}
									loading="lazy"
									className="band-img"
									alt="band"
								/>
								<Image
									src={getWatchScreenUrl({
										watchSize: variant.id,
										watchCase: currentWatch.case,
										watchCaseVariant: currentWatch.caseVariant,
									})}
									width={1000}
									height={1000}
									priority={true}
									className="case-img"
									alt="case"
								/>
							</div>
						</SplideSlide>
					))}
				</SplideTrack>

				<SplideArrows />
			</Splide>
		</div>
	);
}

const SplideArrows = () => (
	<div className="splide__arrows">
		<button className="splide__arrow splide__arrow--prev">
			<Image src="/svg/arrow-right.svg" alt="arrow left" width={10} height={17} />
		</button>
		<button className="splide__arrow splide__arrow--next">
			<Image src="/svg/arrow-right.svg" alt="arrow right" width={10} height={17} />
		</button>
	</div>
);

export default CustomWatch;
