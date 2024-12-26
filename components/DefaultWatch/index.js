import {
	getWatchBeltUrl,
	getWatchScreenUrl,
	getWatchSideViewUrl,
} from "@/functions/watchFucntions";
import WatchDescription from "../WatchDescription";

import Image from "next/image";
import "./style.scss";

function DefaultWatch(props) {
	const { isCustomizing, isSideViewActive, currentWatch } = props;
	return (
		<div className="default-watch" data-active={isCustomizing}>
			<div className="watch-container-1">
				<div className="watch-container-2">
					<div className="watch-wrapper" data-animation="fade-in-500ms">
						<div className="watch-frontView" data-hidden={isSideViewActive}>
							<Image
								width={1000}
								height={1000}
								priority={true}
								className="watch-belt"
								alt="Apple Watch Belt"
								src={getWatchBeltUrl({
									watchSize: currentWatch.size,
									watchBand: currentWatch.band,
									watchBandVariant: currentWatch.bandVariant,
								})}
							/>
							<Image
								width={1000}
								height={1000}
								priority={true}
								className="watch-screen"
								alt="Apple Watch Screen"
								src={getWatchScreenUrl({
									watchSize: currentWatch.size,
									watchCase: currentWatch.case,
									watchCaseVariant: currentWatch.caseVariant,
								})}
							/>
						</div>
						<Image
							width={1000}
							height={1000}
							priority={true}
							// data-hidden="true"
							data-animation={
								isCustomizing & isSideViewActive ? "fade-in-500ms" : "hidden"
							}
							className="watch-sideView"
							alt="Apple Watch Side View"
							src={getWatchSideViewUrl({
								watchSize: currentWatch.size,
								watchCase: currentWatch.case,
								watchCaseVariant: currentWatch.caseVariant,
								watchBand: currentWatch.band,
								watchBandVariant: currentWatch.bandVariant,
							})}
						/>
					</div>
				</div>
			</div>
			{/* Watch Description */}
			{isCustomizing && <WatchDescription {...props} />}
		</div>
	);
}

export default DefaultWatch;
