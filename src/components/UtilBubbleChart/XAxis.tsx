import { ScaleLinear, ScaleTime, timeFormat } from "d3";
import { XAxisOptions } from "type/utilBubbleChart";

type XAxisProps = Omit<XAxisOptions, "data"> & {
	xScale: ScaleTime<number, number, never> | ScaleLinear<Number, number, never>;
	innerWidth: number;
	innerHeight: number;
};
const XAxis = ({
	xScale,
	innerWidth,
	innerHeight,
	axisLabel,
	axisLabelColor = "black",
	tickColor = "gray",
	tickLabelColor = "gray",
	tickWidth = 60,
}: XAxisProps) => {
	const dateFormat = timeFormat("%m-%d %H:%M");
	return (
		<g>
			{xScale.ticks(innerWidth / tickWidth).map((tickValue, idx) => (
				<g key={idx} transform={`translate(${xScale(tickValue)}, 0)`}>
					<line y2={innerHeight + 10} stroke={tickColor} />
					<text y={innerHeight + 13} dy=".91em" style={{ textAnchor: "middle" }} fill={tickLabelColor} fontSize="14px">
						{tickValue instanceof Date ? dateFormat(tickValue) : tickValue}
					</text>
				</g>
			))}
			{axisLabel && (
				<text x={innerWidth / 2} y={innerHeight + 50} textAnchor="middle" color={axisLabelColor} fontSize="1.1em">
					{axisLabel}
				</text>
			)}
		</g>
	);
};

export default XAxis;
