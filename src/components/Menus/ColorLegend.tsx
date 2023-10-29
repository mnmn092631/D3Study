import { ScaleOrdinal } from "d3";

export const ColorLegend = ({
	colorScale,
	tickSpacing = 25,
	tickSize = 10,
	tickTextOffset = 15,
	onHover,
	hoveredValue,
	fadeOpacity,
}: {
	colorScale: ScaleOrdinal<string, unknown, never>;
	tickSpacing?: number;
	tickSize?: number;
	tickTextOffset?: number;
	onHover: React.Dispatch<React.SetStateAction<string | null>>;
	hoveredValue: string | null;
	fadeOpacity: number;
}) => {
	return (
		<>
			{colorScale.domain().map((domainValue, i) => (
				<g
					key={i}
					transform={`translate(0,${i * tickSpacing})`}
					onMouseEnter={() => onHover(domainValue)}
					onMouseOut={() => onHover(null)}
					style={{ cursor: "default" }}
					opacity={
						hoveredValue && domainValue !== hoveredValue ? fadeOpacity : 1
					}
				>
					<circle fill={colorScale(domainValue) as string} r={tickSize} />
					<text x={tickTextOffset} dy=".32em" fill="#635F5D">
						{domainValue}
					</text>
				</g>
			))}
		</>
	);
};
