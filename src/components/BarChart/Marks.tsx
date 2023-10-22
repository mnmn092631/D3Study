import { DSVParsedArray, ScaleBand, ScaleLinear } from "d3";
import { Data } from "./useData";

export const Marks = ({
	data,
	xScale,
	yScale,
	xValue,
	yValue,
}: {
	data: DSVParsedArray<Data>;
	xScale: ScaleLinear<number, number, never>;
	yScale: ScaleBand<string>;
	xValue: (d: Data) => number;
	yValue: (d: Data) => string;
}) => {
	return (
		<>
			{data.map((d) => (
				<rect
					key={yValue(d)}
					x={0}
					y={yScale(yValue(d))}
					width={xScale(xValue(d))}
					height={yScale.bandwidth()}
				/>
			))}
		</>
	);
};
