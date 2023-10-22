import { max, scaleBand, scaleLinear } from "d3";
import { Data, useData } from "components/BarChart/useData";
import { AxisBottom } from "components/BarChart/AxisBottom";
import { AxisLeft } from "components/BarChart/AixsLeft";
import { Marks } from "components/BarChart/Marks";

const margin = { top: 20, right: 20, bottom: 20, left: 200 };

const BarChart = ({ width, height }: { [key: string]: number }) => {
	const data = useData();

	if (!data) return <p>Loading...</p>;

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const yValue = (d: Data) => d.Country;
	const xValue = (d: Data) => d.Population;

	const yScale = scaleBand().domain(data.map(yValue)).range([0, innerHeight]);

	const xScale = scaleLinear()
		.domain([0, max(data, xValue)!])
		.range([0, innerWidth]);

	return (
		<svg width={width} height={height}>
			<g transform={`translate(${margin.left},${margin.top})`}>
				<AxisBottom xScale={xScale} innerHeight={innerHeight} />
				<AxisLeft yScale={yScale} />
				<Marks
					data={data}
					xScale={xScale}
					yScale={yScale}
					xValue={xValue}
					yValue={yValue}
				/>
			</g>
		</svg>
	);
};

export default BarChart;
