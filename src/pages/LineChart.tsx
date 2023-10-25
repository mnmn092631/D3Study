import { AxisBottom } from "components/LineChart/AxisBottom";
import { AxisLeft } from "components/LineChart/AxisLeft";
import { Marks } from "components/LineChart/Marks";
import { TemperatureData, useData } from "components/LineChart/useData";
import { extent, scaleLinear, scaleTime, timeFormat } from "d3";

const margin = { top: 20, right: 20, bottom: 70, left: 100 };
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 40;

const LineChart = ({ width, height }: { [key: string]: number }) => {
	const data = useData();

	if (!data) return <p>Loading...</p>;

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const xValue = (d: TemperatureData) => d.timestamp;
	const xAxisLabel = "Time";

	const yValue = (d: TemperatureData) => d.temperature;
	const yAxisLabel = "Temperature";

	const xAixsTickFormat = timeFormat("%a");

	const xScale = scaleTime()
		.domain(extent(data, xValue) as Date[])
		.range([0, innerWidth])
		.nice();

	const yScale = scaleLinear()
		.domain(extent(data, yValue) as number[])
		.range([innerHeight, 0])
		.nice();

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				<AxisBottom
					innerHeight={innerHeight}
					xScale={xScale}
					tickFormat={xAixsTickFormat}
					tickOffset={7}
				/>
				<AxisLeft innerWidth={innerWidth} yScale={yScale} tickOffset={7} />
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
					tooltipFormat={xAixsTickFormat}
					circleRadius={4}
				/>
			</g>
		</svg>
	);
};

export default LineChart;
