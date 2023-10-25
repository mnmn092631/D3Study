import { DSVParsedArray, ScaleLinear, ScaleTime, curveNatural, line } from "d3";
import { TemperatureData } from "./useData";

export const Marks = ({
	data,
	xScale,
	xValue,
	yScale,
	yValue,
	tooltipFormat,
	circleRadius,
}: {
	data: DSVParsedArray<TemperatureData>;
	xScale: ScaleTime<number, number, never>;
	xValue: (d: TemperatureData) => Date;
	yScale: ScaleLinear<number, number, never>;
	yValue: (d: TemperatureData) => number;
	tooltipFormat: (tickValue: Date) => string;
	circleRadius: number;
}) => {
	return (
		<g>
			<path
				fill="none"
				stroke="#137B80"
				strokeWidth={5}
				strokeLinejoin="round"
				strokeLinecap="round"
				d={
					line<TemperatureData>()
						.x((d) => xScale(xValue(d)))
						.y((d) => yScale(yValue(d)))
						.curve(curveNatural)(data) || ""
				}
			/>
			{data.map((d) => (
				<circle
					cx={xScale(xValue(d))}
					cy={yScale(yValue(d))}
					r={circleRadius}
					fill="#137B80"
				>
					<title>{tooltipFormat(xValue(d))}</title>
				</circle>
			))}
		</g>
	);
};
