import { DSVParsedArray, ScaleLinear } from "d3";
import { IrisData } from "./useData";

export const Marks = ({
	data,
	xScale,
	xValue,
	yScale,
	yValue,
	circleRadius,
}: {
	data: DSVParsedArray<IrisData>;
	xScale: ScaleLinear<number, number, never>;
	xValue: (d: IrisData) => number;
	yScale: ScaleLinear<number, number, never>;
	yValue: (d: IrisData) => number;
	circleRadius: number;
}) => {
	return (
		<>
			{data.map((d, i) => (
				<circle
					key={d.species + i}
					cx={xScale(xValue(d))}
					cy={yScale(yValue(d))}
					r={circleRadius}
					fill="#137B80"
				/>
			))}
		</>
	);
};
