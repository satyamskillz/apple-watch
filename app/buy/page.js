import {
	getWatchBeltUrl,
	getWatchScreenUrl,
	getWatchSideViewUrl,
} from "@/functions/watchFucntions";
import "./style.scss";
import Image from "next/image";

import collections from "@/assets/collectionData.json";

export default async function Page(props) {
	const searchParams = await props.searchParams;

	const watchSize = searchParams.size;
	const watchCase = searchParams.case;
	const watchCaseVariant = searchParams.caseVariant;
	const watchBand = searchParams.band;
	const watchBandVariant = searchParams.bandVariant;

	const collectionId = searchParams.collection;

	// names functons

	const currentCollection = collections.find((c) => c.id === collectionId);

	const newSize = currentCollection.options[0].variants.find((v) => v.id === watchSize);
	const newCase = currentCollection.options[1].variants.find((v) => v.id === watchCase);
	const newCaseVariant = newCase.variants.find((v) => v.id === watchCaseVariant);
	const newBand = currentCollection.options[2].variants.find((v) => v.id === watchBand);
	const newBandVariant = newBand.variants.find((v) => v.id === watchBandVariant);

	return (
		<div className="buy-page">
			<div className="container">
				<h1>Buy Apple Watch SE</h1>
				<div className="watch-ctn">
					<div className="grid">
						<div className="img-wrapper">
							<Image
								width={1000}
								height={1000}
								priority={true}
								data-animation="fade-in-500ms"
								className="watch-sideView"
								alt="Apple Watch Side View"
								src={getWatchSideViewUrl({
									watchSize,
									watchCase,
									watchCaseVariant,
									watchBand,
									watchBandVariant,
								})}
							/>
						</div>
						<div className="img-wrapper">
							<Image
								width={1000}
								height={1000}
								priority={true}
								className="watch-screen"
								alt="Apple Watch Screen"
								src={getWatchScreenUrl({
									watchSize,
									watchCase,
									watchCaseVariant,
								})}
							/>
						</div>
						<div className="img-wrapper">
							<Image
								width={1000}
								height={1000}
								priority={true}
								className="watch-belt"
								alt="Apple Watch Belt"
								src={getWatchBeltUrl({
									watchSize,
									watchBand,
									watchBandVariant,
								})}
							/>
						</div>
					</div>
					<div className="info">
						<p className="title">Here’s your chosen watch.</p>
						<p className="details">
							{`${newSize.name} ${newCaseVariant.name} ${newCase.name} Case with ${newBandVariant.name} ${newBand.name}`}
						</p>
						<p className="price">
							From $
							{Number(
								newSize.price + newCaseVariant.price + newBandVariant.price
							).toFixed(2)}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
