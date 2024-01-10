import { ScaleLinear } from "d3";
import { YAxisOptions } from "type/utilMultiLineChart";

type YAxisProps = YAxisOptions & {
	innerHeight: number;
	innerWidth: number;
	yScale: ScaleLinear<number, number, never>;
};

const YAxis = ({ innerHeight, innerWidth, yScale, tickColor = "gray", tickLabelColor = "#000" }: YAxisProps) => {
	return (
		<g>
			<line y1={innerHeight} x2={innerWidth} y2={innerHeight} stroke={tickColor} />
			{yScale.ticks(5).map((tickValue) => (
				<g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
					<line x2={10} stroke={tickColor} />
					<text key={tickValue} dy=".32em" x={-5} fontSize="12px" textAnchor="end" fill={tickLabelColor}>
						{tickValue}
					</text>
				</g>
			))}
		</g>
	);
};

export default YAxis;
