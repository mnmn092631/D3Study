import { format, max, scaleBand, scaleLinear } from "d3";
import { Data, useData } from "components/BarChart/useData";
import { AxisBottom } from "components/BarChart/AxisBottom";
import { AxisLeft } from "components/BarChart/AixsLeft";
import { Marks } from "components/BarChart/Marks";

const margin = { top: 20, right: 20, bottom: 70, left: 200 };
const xAxisLabelOffset = 60;

const BarChart = ({ width, height }: { [key: string]: number }) => {
	const data = useData();

	if (!data) return <p>Loading...</p>;

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const yValue = (d: Data) => d.Country;
	const xValue = (d: Data) => d.Population;

	const siFormat = format(".2s");
	const xAxisTickFormat = (tickValue: number) =>
		siFormat(tickValue).replace("G", "B");

	const yScale = scaleBand()
		.domain(data.map(yValue))
		.range([0, innerHeight])
		.paddingInner(0.15);

	const xScale = scaleLinear()
		.domain([0, max(data, xValue)!])
		.range([0, innerWidth]);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				<AxisBottom
					xScale={xScale}
					innerHeight={innerHeight}
					tickFormat={xAxisTickFormat}
				/>
				<AxisLeft yScale={yScale} />
				<text
					x={innerWidth / 2}
					y={innerHeight + xAxisLabelOffset}
					textAnchor="middle"
					style={{ fontSize: "2.5em", fill: "#635F5D" }}
				>
					Population
				</text>
				<Marks
					data={data}
					xScale={xScale}
					yScale={yScale}
					xValue={xValue}
					yValue={yValue}
					tooltipFormat={xAxisTickFormat}
				/>
			</g>
		</svg>
	);
};

export default BarChart;
