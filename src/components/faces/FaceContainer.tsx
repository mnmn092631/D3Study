export const FaceContainer = ({
	width,
	height,
	centerX,
	centerY,
	children,
}: {
	width: number;
	height: number;
	centerX: number;
	centerY: number;
	children: React.ReactNode;
}) => (
	<svg width={width} height={height}>
		<g transform={`translate(${centerX},${centerY})`}>{children}</g>
	</svg>
);
