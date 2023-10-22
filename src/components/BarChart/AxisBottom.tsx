import { ScaleLinear } from "d3";

export const AxisBottom = ({
	xScale,
	innerHeight,
}: {
	xScale: ScaleLinear<number, number, never>;
	innerHeight: number;
}) => {
	return (
		<>
			{xScale.ticks().map((tickValue) => (
				<g key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
					<line y2={innerHeight} stroke="black" />
					<text y={innerHeight + 3} dy=".71em" style={{ textAnchor: "middle" }}>
						{tickValue}
					</text>
				</g>
			))}
		</>
	);
};
