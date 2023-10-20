export const BackgroundCircle = ({
	radius,
	strokeWidth,
}: {
	[key: string]: number;
}) => (
	<circle r={radius} fill="yellow" stroke="black" strokeWidth={strokeWidth} />
);
