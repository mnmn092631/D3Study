import { ScaleLinear } from "d3";

export const AxisLeft = ({
	innerWidth,
	yScale,
	tickOffset = 3,
}: {
	innerWidth: number;
	yScale: ScaleLinear<number, number, never>;
	tickOffset?: number;
}) => {
	return (
		<>
			{yScale.ticks().map((tickValue) => (
				<g key={tickValue} transform={`translate(0,${yScale(tickValue)})`}>
					<line x2={innerWidth} stroke="#C0C0BB" />
					<text
						key={tickValue}
						dy=".32em"
						x={-tickOffset}
						style={{ textAnchor: "end" }}
						fill="#8E8883"
					>
						{tickValue}
					</text>
				</g>
			))}
		</>
	);
};
