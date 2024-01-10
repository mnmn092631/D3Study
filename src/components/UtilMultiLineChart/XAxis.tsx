import { ScaleLinear, ScalePoint, format } from "d3";
import { XAxisOptions } from "type/type";

type XAxisProps = XAxisOptions & {
	innerWidth: number;
	innerHeight: number;
	xScale: ScalePoint<string> | ScaleLinear<number, number, never>;
};

const XAxis = ({
	data,
	innerWidth,
	innerHeight,
	xScale,
	tickColor = "gray",
	tickLabelColor = "#000",
	tickWidth = 60,
}: XAxisProps) => {
	let xScaleValues: string[] | number[];
	if (typeof data[0] === "string") {
		xScaleValues = (xScale as ScalePoint<string>).domain();
	} else if (typeof data[0] === "number") {
		xScaleValues = (xScale as ScaleLinear<number, number, never>).ticks(innerWidth / tickWidth);
	} else return null;

	return (
		<g>
			<line y2={innerHeight} stroke={tickColor} />
			{xScaleValues.map((value: string | number, idx: number) => (
				<g key={idx} transform={`translate(${xScale(value as string & { valueOf(): number })}, 5)`}>
					<line y1={innerHeight - 5} y2={innerHeight} stroke={tickColor} />
					<text y={innerHeight + 5} dy=".71em" fontSize="12px" style={{ textAnchor: "middle" }} fill={tickLabelColor}>
						{typeof data[0] === "number" ? format(",d")(value as number) : value}
					</text>
				</g>
			))}
		</g>
	);
};

export default XAxis;
