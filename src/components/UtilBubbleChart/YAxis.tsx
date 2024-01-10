import { ScaleLinear } from "d3";
import { YAxisOptions } from "type/utilBubbleChart";

type YAxisProps = Omit<YAxisOptions, "data"> & {
	yScale: ScaleLinear<number, number, never>;
	innerWidth: number;
	innerHeight: number;
};

const YAxis = ({
	yScale,
	innerWidth,
	innerHeight,
	axisLabel,
	axisLabelColor = "black",
	tickColor = "gray",
	tickLabelColor = "gray",
}: YAxisProps) => {
	return (
		<g>
			{yScale.ticks().map((tickValue) => (
				<g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
					<line x1={-10} x2={innerWidth} stroke={tickColor} />
					<text key={tickValue} dy=".32em" x={-16} textAnchor="end" fill={tickLabelColor} fontSize="14px">
						{tickValue}
					</text>
				</g>
			))}
			{axisLabel && (
				<text
					textAnchor="middle"
					transform={`translate(${-55}, ${innerHeight / 2}) rotate(-90)`}
					color={axisLabelColor}
					fontSize="1.1em"
				>
					{axisLabel}
				</text>
			)}
		</g>
	);
};

export default YAxis;
