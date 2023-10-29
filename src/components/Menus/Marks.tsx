import { DSVParsedArray, ScaleLinear, ScaleOrdinal } from "d3";
import { IrisData } from "./useData";

export const Marks = ({
	data,
	xScale,
	xValue,
	yScale,
	yValue,
	colorScale,
	colorValue,
	circleRadius,
}: {
	data: DSVParsedArray<IrisData> | IrisData[];
	xScale: ScaleLinear<number, number, never>;
	xValue: (d: IrisData) => number;
	yScale: ScaleLinear<number, number, never>;
	yValue: (d: IrisData) => number;
	colorScale: ScaleOrdinal<string, unknown, never>;
	colorValue: (d: IrisData) => string;
	circleRadius: number;
}) => {
	return (
		<>
			{data.map((d, i) => (
				<circle
					key={d.species + i}
					cx={xScale(xValue(d))}
					cy={yScale(yValue(d))}
					fill={colorScale(colorValue(d)) as string}
					r={circleRadius}
				/>
			))}
		</>
	);
};
