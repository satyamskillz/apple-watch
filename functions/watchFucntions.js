export const getWatchBeltUrl = ({ watchSize, watchBand, watchBandVariant }) => {
	return `/jpeg/watch-band/watch-band-${watchSize}-${watchBand}-${watchBandVariant}.jpeg`;
};

export const getWatchScreenUrl = ({ watchSize, watchCase, watchCaseVariant }) => {
	return `/png/watch-case/watch-case-${watchSize}-${watchCase}-${watchCaseVariant}.png`;
};

export const getWatchSideViewUrl = ({
	watchSize,
	watchCase,
	watchCaseVariant,
	watchBand,
	watchBandVariant,
}) => {
	return `/jpeg/watch-sideView/watch-sideView-${watchSize}-${watchCase}-${watchCaseVariant}-${watchBand}-${watchBandVariant}.jpeg`;
};
