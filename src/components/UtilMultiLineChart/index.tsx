import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScaleLinear, ScalePoint, curveNatural, line, pointer } from "d3";
import {
	LegendOptions,
	LinesOptions,
	PaneOptions,
	SelectedItem,
	SelectionOptions,
	Series,
	XAxisOptions,
	YAxisOptions,
} from "type/type";
import { getLinearScale, getPointScale, findItemsByCoord } from "util/util";
import XAxis from "./XAxis";
import YAxis from "./YAxis";
import Lines from "./Lines";
import Legend from "./Legend";
import Selection from "./Selection";
import Tooltip from "./Tooltip";
import * as S from "style/style";

export const D3_DEFAULT_COLORS = ["#fd7f6f", "#7eb0d5", "#b2e061", "#bd7ebe", "#ffb55a"];

interface UtilMultiLineChartProps {
	series: Series[];
	paneOptions: PaneOptions;
	xAxisOptions: XAxisOptions;
	yAxisOptions?: YAxisOptions;
	linesOptions?: LinesOptions;
	legendOptions?: LegendOptions;
	selectionOptions?: SelectionOptions;
}

const UtilMultiLineChart = ({
	series,
	paneOptions,
	xAxisOptions,
	yAxisOptions,
	linesOptions,
	legendOptions,
	selectionOptions,
}: UtilMultiLineChartProps) => {
	const { width, height, margin } = paneOptions;

	const [selected, setSelected] = useState<(SelectedItem | null)[] | null>(null);
	const [coord, setCoord] = useState<[number, number]>();
	const [isMouseMove, setIsMouseMove] = useState<boolean>(false);

	const svgContainerRef = useRef<HTMLDivElement>(null);
	const [clientWidth, setClientWidth] = useState(width);

	useEffect(() => {
		function handleResize() {
			if (!svgContainerRef.current) return;
			const clientWidth = svgContainerRef.current.clientWidth;
			setClientWidth(clientWidth);
		}
		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = clientWidth - margin.left - margin.right;

	let xScale: ScalePoint<string> | ScaleLinear<number, number, never> | null = null;
	if (typeof xAxisOptions.data[0] === "string") xScale = getPointScale(xAxisOptions.data as string[], [0, innerWidth]);
	else if (typeof xAxisOptions.data[0] === "number")
		xScale = getLinearScale({ series: xAxisOptions.data as number[], range: [0, innerWidth] });

	const yScale = getLinearScale({ series, range: [innerHeight, 0], domainMin: 0 });

	const lineFunc =
		!xScale || !yScale
			? null
			: line<number>()
					.x((_, i) => {
						const xValue = xAxisOptions.data[i];
						return xScale!(xValue as string & { valueOf(): number }) as number;
					})
					.y((d) => yScale!(d) as number)
					.curve(curveNatural);

	const onMouseMove = useCallback(
		(mouse: React.MouseEvent<HTMLDivElement>) => {
			const selected = findItemsByCoord({
				xAxis: xAxisOptions.data,
				series: series,
				range: [0, innerWidth],
				scale: xScale,
				x: pointer(mouse)[0],
				marginLeft: margin.left,
			});
			setSelected(() => selected);
			setCoord(() => pointer(mouse));
			setIsMouseMove(true);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[innerWidth, series]
	);

	return (
		<S.UtilMultiLineChartContainer>
			<Legend {...legendOptions} series={series} />
			<div
				style={{ width: "100%" }}
				onMouseMove={onMouseMove}
				onMouseLeave={() => setIsMouseMove(false)}
				ref={svgContainerRef}
			>
				<svg viewBox={`0 0 ${clientWidth} ${height}`}>
					{xScale && yScale && lineFunc && (
						<g transform={`translate(${margin.left},${margin.top})`}>
							<XAxis {...xAxisOptions} innerWidth={innerWidth} innerHeight={innerHeight} xScale={xScale} />
							<YAxis {...yAxisOptions} innerHeight={innerHeight} innerWidth={innerWidth} yScale={yScale} />
							<Lines
								{...linesOptions}
								series={series}
								xAxis={xAxisOptions.data}
								lineFunc={lineFunc}
								xScale={xScale}
								yScale={yScale}
							/>
							{xAxisOptions.axisLabel && (
								<text
									x={innerWidth / 2}
									y={innerHeight + 50}
									textAnchor="middle"
									color={xAxisOptions.axisLabelColor || "#000"}
									fontSize="1.1em"
								>
									{xAxisOptions.axisLabel}
								</text>
							)}
							{yAxisOptions?.axisLabel && (
								<text
									textAnchor="middle"
									transform={`translate(${-50}, ${innerHeight / 2}) rotate(-90)`}
									color={yAxisOptions.axisLabelColor || "#000"}
									fontSize="1.1em"
								>
									{yAxisOptions.axisLabel}
								</text>
							)}
							{isMouseMove && (
								<Selection
									{...selectionOptions}
									xAxis={xAxisOptions.data}
									innerHeight={innerHeight}
									xScale={xScale}
									yScale={yScale}
									selected={selected}
									series={series}
								/>
							)}
						</g>
					)}
				</svg>
				{isMouseMove && coord && (
					<Tooltip {...selectionOptions?.tooltip} selected={selected} series={series} coord={coord} />
				)}
			</div>
		</S.UtilMultiLineChartContainer>
	);
};

export default UtilMultiLineChart;
