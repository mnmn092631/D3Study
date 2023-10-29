import { ScaleLinear } from "d3";

export const AxisBottom = ({
	xScale,
	innerHeight,
	tickFormat,
	tickOffset = 3,
}: {
	xScale: ScaleLinear<number, number, never>;
	innerHeight: number;
	tickFormat: (tickValue: number) => string;
	tickOffset?: number;
}) => {
	return (
		<>
			{xScale.ticks().map((tickValue) => (
				<g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
					<line y2={innerHeight} stroke="#C0C0BB" />
					<text
						y={innerHeight + tickOffset}
						dy=".71em"
						style={{ textAnchor: "middle" }}
						fill="#8E8883"
					>
						{tickFormat(tickValue)}
					</text>
				</g>
			))}
		</>
	);
};
