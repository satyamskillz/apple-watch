import { useEffect, useState } from "react";
import "./style.scss";

function WatchDescription({
	isSideViewActive,
	setSideViewActive,
	currentWatch,
	currentCollection,
}) {
	const [price, setPrice] = useState(0);

	const [watch, setWatch] = useState({
		size: "46mm",
		case: "Aluminum",
		caseVariant: "Jet Black",
		band: "Solo Loop",
		bandVariant: "Black",
	});

	useEffect(() => {
		if (currentWatch) {
			const newSize = currentCollection.options[0].variants.find(
				(v) => v.id === currentWatch.size
			);
			const newCase = currentCollection.options[1].variants.find(
				(v) => v.id === currentWatch.case
			);
			const newCaseVariant = newCase.variants.find((v) => v.id === currentWatch.caseVariant);
			const newBand = currentCollection.options[2].variants.find(
				(v) => v.id === currentWatch.band
			);
			const newBandVariant = newBand.variants.find((v) => v.id === currentWatch.bandVariant);
			setWatch({
				size: newSize.name,
				case: newCase.name,
				caseVariant: newCaseVariant.name,
				band: newBand.name,
				bandVariant: newBandVariant.name,
			});

			setPrice(
				Number(newSize.price + newCaseVariant.price + newBandVariant.price).toFixed(2)
			);
		}

		return () => {
			setWatch({
				size: "46mm",
				case: "Aluminum",
				caseVariant: "Jet Black",
				band: "Solo Loop",
				bandVariant: "Black",
			});
		};
	}, [currentWatch]);

	return (
		<div className="watch-decription">
			<div className="layer">
				<span onClick={() => setSideViewActive((prev) => !prev)} className="view-btn">
					{!isSideViewActive ? "Side view" : "Front view"}
				</span>
				<div className="description">
					<p className="series">{currentCollection.name}</p>
					<p className="details">{`${watch.size} ${watch.caseVariant} ${watch.case} Case with ${watch.bandVariant} ${watch.band}`}</p>
					<p className="price">From ${price}</p>
				</div>
			</div>
		</div>
	);
}

export default WatchDescription;
