import { AxisBottom } from "components/Menus/AxisBottom";
import { AxisLeft } from "components/Menus/AxisLeft";
import { ColorLegend } from "components/Menus/ColorLegend";
import { Dropdown } from "components/Menus/Dropdown";
import { Marks } from "components/Menus/Marks";
import { IrisData, useData } from "components/Menus/useData";
import { extent, format, scaleLinear, scaleOrdinal } from "d3";
import { useState } from "react";

const margin = { top: 20, right: 200, bottom: 70, left: 100 };
const xAxisLabelOffset = 60;
const yAxisLabelOffset = 40;
const circleRadius = 7;
const fadeOpacity = 0.2;

const attributes = [
	{ value: "sepal_length", label: "Sepal Length" },
	{ value: "sepal_width", label: "Sepal Width" },
	{ value: "petal_length", label: "Petal Length" },
	{ value: "petal_width", label: "Petal Width" },
	{ value: "species", label: "Species" },
];

const getLabel = (value: string) => {
	for (let i = 0; i < attributes.length; i++) {
		if (attributes[i].value === value) {
			return attributes[i].label;
		}
	}
};

const Menus = ({ width, height }: { [key: string]: number }) => {
	const data = useData();
	const [hoveredValue, setHoveredValue] = useState<string | null>(null);

	const initialXAttribute = "petal_length";
	const [xAttribute, setXAttribute] =
		useState<keyof Omit<IrisData, "species">>(initialXAttribute);
	const xValue = (d: IrisData) => d[xAttribute];
	const xAxisLabel = getLabel(xAttribute);

	const initialYAttribute = "sepal_width";
	const [yAttribute, setYAttribute] =
		useState<keyof Omit<IrisData, "species">>(initialYAttribute);
	const yValue = (d: IrisData) => d[yAttribute];
	const yAxisLabel = getLabel(yAttribute);

	if (!data) return <p>Loading...</p>;

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	const siFormat = format(".2s");
	const xAxisTickFormat = (tickValue: number) => siFormat(tickValue);

	const xScale = scaleLinear()
		.domain(extent(data, xValue) as number[])
		.range([0, innerWidth])
		.nice();

	const yScale = scaleLinear()
		.domain(extent(data, yValue) as number[])
		.range([0, innerHeight])
		.nice();

	const colorValue = (d: IrisData) => d.species;
	const colorScale = scaleOrdinal()
		.domain(data.map(colorValue))
		.range(["#E6842A", "#137B80", "#8E6C8A"]);
	const colorLegendLabel = "Species";

	const filteredData = data.filter((d) => hoveredValue === colorValue(d));

	return (
		<>
			<div>
				<label htmlFor="x-select">X:</label>
				<Dropdown
					options={attributes}
					id="x-select"
					selectedValue={xAttribute}
					onSelectedValueChange={setXAttribute}
				/>
				<label htmlFor="y-select">Y:</label>
				<Dropdown
					options={attributes}
					id="y-select"
					selectedValue={yAttribute}
					onSelectedValueChange={setYAttribute}
				/>
			</div>
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
					<g transform={`translate(${innerWidth + 50}, 60)`}>
						<text
							x={-25}
							y={-30}
							style={{ fontSize: "2.5em", fill: "#635F5D" }}
						>
							{colorLegendLabel}
						</text>
						<ColorLegend
							colorScale={colorScale}
							tickSize={circleRadius}
							onHover={setHoveredValue}
							hoveredValue={hoveredValue}
							fadeOpacity={fadeOpacity}
						/>
					</g>
					<g opacity={hoveredValue ? fadeOpacity : 1}>
						<Marks
							data={data}
							xScale={xScale}
							xValue={xValue}
							yScale={yScale}
							yValue={yValue}
							colorScale={colorScale}
							colorValue={colorValue}
							circleRadius={circleRadius}
						/>
					</g>
					<Marks
						data={filteredData}
						xScale={xScale}
						xValue={xValue}
						yScale={yScale}
						yValue={yValue}
						colorScale={colorScale}
						colorValue={colorValue}
						circleRadius={circleRadius}
					/>
				</g>
			</svg>
		</>
	);
};

export default Menus;
