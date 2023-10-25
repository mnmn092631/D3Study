import { AxisBottom } from "components/ScatterPlot/AxisBottom";
import { AxisLeft } from "components/ScatterPlot/AxisLeft";
import { Marks } from "components/ScatterPlot/Marks";
import { useData, IrisData } from "components/ScatterPlot/useData";
import { extent, format, scaleLinear } from "d3";

const margin = { top: 20, right: 20, bottom: 70, left: 100 };
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 40;

const ScatterPlot = ({ width, height }: { [key: string]: number }) => {
	const data = useData();

	if (!data) return <p>Loading...</p>;

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const xValue = (d: IrisData) => d.sepal_length;
	const xAxisLabel = "Sepal Length";

	const yValue = (d: IrisData) => d.sepal_width;
	const yAxisLabel = "Sepal Width";

	const siFormat = format(".2s");
	const xAxisTickFormat = (tickValue: number) => siFormat(tickValue);

	const xScale = scaleLinear()
		.domain(extent(data, xValue) as number[])
		.range([0, innerWidth])
		.nice();

	const yScale = scaleLinear()
		.domain(extent(data, yValue) as number[])
		.range([0, innerHeight]);

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
					data={data}
					xScale={xScale}
					xValue={xValue}
					yScale={yScale}
					yValue={yValue}
					circleRadius={7}
				/>
			</g>
		</svg>
	);
};

export default ScatterPlot;
