import { AxisBottom } from "components/Histogram/AxisBottom";
import { AxisLeft } from "components/Histogram/AxisLeft";
import { Marks } from "components/Histogram/Marks";
import { MissingData, useData } from "components/Histogram/useData";
import {
	extent,
	scaleLinear,
	scaleTime,
	timeFormat,
	bin,
	timeMonths,
	sum,
	max,
} from "d3";

const margin = { top: 20, right: 20, bottom: 70, left: 100 };
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 60;

const Histogram = ({ width, height }: { [key: string]: number }) => {
	const data = useData();

	if (!data) return <p>Loading...</p>;

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const xValue = (d: MissingData) => d["Reported Date"];
	const xAxisLabel = "Time";

	const yValue = (d: MissingData) => d["Total Dead and Missing"];
	const yAxisLabel = "Total Dead and Missing";

	const xAxisTickFormat = timeFormat("%m/%d/%Y");

	const xScale = scaleTime()
		.domain(extent(data, xValue) as Date[])
		.range([0, innerWidth])
		.nice();

	const [start, stop] = xScale.domain();

	const binnedData = bin<MissingData, Date>()
		.value(xValue)
		.domain(xScale.domain() as [Date, Date])
		.thresholds(timeMonths(start, stop))(data)
		.map((array) => ({
			y: sum(array, yValue),
			x0: array.x0,
			x1: array.x1,
		}));

	const yScale = scaleLinear()
		.domain([0, max(binnedData, (d) => d.y)] as number[])
		.range([innerHeight, 0])
		.nice();

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				<AxisBottom
					xScale={xScale}
					innerHeight={innerHeight}
					tickFormat={xAxisTickFormat}
					tickOffset={5}
				/>
				<AxisLeft innerWidth={innerWidth} yScale={yScale} tickOffset={5} />
				<text
					x={innerWidth / 2}
					y={innerHeight + xAxisLabelOffset}
					textAnchor="middle"
					style={{ fontSize: "2.5em", fill: "#635F5D" }}
				>
					{xAxisLabel}
				</text>
				<text
					textAnchor="middle"
					transform={`translate(${-yAxisLabelOffset},${
						innerHeight / 2
					}) rotate(-90)`}
					style={{ fontSize: "2.5em", fill: "#635F5D" }}
				>
					{yAxisLabel}
				</text>
				<Marks
					binnedData={binnedData}
					xScale={xScale}
					yScale={yScale}
					innerHeight={innerHeight}
				/>
			</g>
		</svg>
	);
};

export default Histogram;
