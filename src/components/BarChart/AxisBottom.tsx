import { ScaleLinear } from "d3";

export const AxisBottom = ({
	xScale,
	innerHeight,
	tickFormat,
}: {
	xScale: ScaleLinear<number, number, never>;
	innerHeight: number;
	tickFormat: (tickValue: number) => string;
}) => {
	return (
		<>
			{xScale.ticks().map((tickValue) => (
				<g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
					<line y2={innerHeight} stroke="#C0C0BB" />
					<text
						y={innerHeight + 3}
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
