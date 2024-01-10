import { ScaleLinear, ScaleTime } from "d3";
import { useEffect, useRef, useState } from "react";
import * as S from "style/utilBubbleChart.style";
import {
	LegendOptions,
	PaneOptions,
	XAxisOptions,
	YAxisOptions,
	ZAxisOptions,
	ColorOptions,
} from "type/utilBubbleChart";
import { getLinearScale, getScaleOrdinal, getTimeScale } from "util/util";
import Legend from "./Legend";
import XAxis from "./XAxis";
import YAxis from "./YAxis";
import Bubble from "./Bubble";

interface UtilBubbleChartProps {
	xAxisOptions: XAxisOptions;
	yAxisOptions: YAxisOptions;
	zAxisOptions?: ZAxisOptions;
	colorOptions: ColorOptions;
	paneOptions: PaneOptions;
	legendOptions?: LegendOptions;
}

const UtilBubbleChart = ({
	xAxisOptions,
	yAxisOptions,
	zAxisOptions,
	colorOptions,
	paneOptions,
	legendOptions,
}: UtilBubbleChartProps) => {
	const { width, height, margin } = paneOptions;

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

	let xScale: ScaleTime<number, number, never> | ScaleLinear<Number, number, never> | null = null;
	if (typeof xAxisOptions.data[0] === "number")
		xScale = getLinearScale({ series: xAxisOptions.data as number[], range: [0, innerWidth] });
	else if (xAxisOptions.data[0] instanceof Date) {
		xScale = getTimeScale(xAxisOptions.data as Date[], [0, innerWidth]);
	}

	const yScale = getLinearScale({ series: yAxisOptions.data, range: [innerHeight, 0] });

	let zScale: ScaleLinear<number, number, never> | null = null;
	if (zAxisOptions) zScale = getLinearScale({ series: zAxisOptions.data, range: zAxisOptions.range });

	const colorScale = getScaleOrdinal(colorOptions.domain, colorOptions.colorRange);

	return (
		<S.UtilBubbleChartContainer>
			<Legend {...legendOptions} domain={colorOptions.domain} colorScale={colorScale} />

			<div style={{ width: "100%" }}>
				<svg viewBox={`0 0 ${clientWidth} ${height}`}>
					{xScale && yScale && (
						<g transform={`translate(${margin.left}, ${margin.top})`}>
							<XAxis {...xAxisOptions} xScale={xScale} innerWidth={innerWidth} innerHeight={innerHeight} />
							<YAxis {...yAxisOptions} yScale={yScale} innerWidth={innerWidth} innerHeight={innerHeight} />
							<Bubble
								xData={xAxisOptions.data}
								xScale={xScale}
								yData={yAxisOptions.data}
								yScale={yScale}
								zData={zAxisOptions?.data}
								zScale={zScale}
								colorData={colorOptions.data}
								colorScale={colorScale}
							/>
						</g>
					)}
				</svg>
			</div>
		</S.UtilBubbleChartContainer>
	);
};

export default UtilBubbleChart;
