import { ScaleTime } from "d3";

export const AxisBottom = ({
	xScale,
	innerHeight,
	tickFormat,
	tickOffset = 3,
}: {
	xScale: ScaleTime<number, number, never>;
	innerHeight: number;
	tickFormat: (date: Date) => string;
	tickOffset?: number;
}) => {
	return (
		<>
			{xScale.ticks().map((tickValue) => (
				<g
					key={tickValue.toISOString()}
					transform={`translate(${xScale(tickValue)},0)`}
				>
					<line y2={innerHeight} stroke="#C0C0BB" />
					<text
						y={innerHeight + tickOffset}
						dy=".71em"
						textAnchor="middle"
						fill="#8E8883"
					>
						{tickFormat(tickValue)}
					</text>
				</g>
			))}
		</>
	);
};
