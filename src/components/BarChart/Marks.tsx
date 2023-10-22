import { DSVParsedArray, ScaleBand, ScaleLinear } from "d3";
import { Data } from "./useData";

export const Marks = ({
	data,
	xScale,
	yScale,
	xValue,
	yValue,
	tooltipFormat,
}: {
	data: DSVParsedArray<Data>;
	xScale: ScaleLinear<number, number, never>;
	yScale: ScaleBand<string>;
	xValue: (d: Data) => number;
	yValue: (d: Data) => string;
	tooltipFormat: (tickValue: number) => string;
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
					fill="#137B80"
				>
					<title>{tooltipFormat(xValue(d))}</title>
				</rect>
			))}
		</>
	);
};
