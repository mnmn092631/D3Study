import { ScaleLinear, ScaleOrdinal, ScaleTime } from "d3";

type BubbleProps = {
	xData: Date[] | number[];
	xScale: ScaleTime<number, number, never> | ScaleLinear<Number, number, never>;
	yData: number[];
	yScale: ScaleLinear<number, number, never>;
	zData?: number[];
	zScale?: ScaleLinear<number, number, never> | null;
	colorData: string[];
	colorScale: ScaleOrdinal<string, unknown, never>;
};
const Bubble = ({ xData, xScale, yData, yScale, zData, zScale, colorData, colorScale }: BubbleProps) => {
	return (
		<g>
			{xData.map((xDatum, idx) => (
				<circle
					key={idx}
					cx={xScale!(xDatum)}
					cy={yScale(yData[idx])}
					r={zScale && zData ? zScale(zData[idx]) : 3}
					fill={(colorScale(colorData[idx]) as string) || "lightGray"}
					stroke="gray"
					fillOpacity={0.7}
				/>
			))}
		</g>
	);
};

export default Bubble;
