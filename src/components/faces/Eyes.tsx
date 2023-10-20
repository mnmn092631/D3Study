export const Eyes = ({
	eyeOffsetX,
	eyeOffsetY,
	eyeRadius,
}: {
	[key: string]: number;
}) => (
	<>
		<circle cx={-eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
		<circle cx={eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius} />
	</>
);
