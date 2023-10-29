import { ScaleLinear, ScaleTime } from "d3";

export const Marks = ({
	binnedData,
	xScale,
	yScale,
	innerHeight,
}: {
	binnedData: {
		y: number;
		x0: Date | undefined;
		x1: Date | undefined;
	}[];
	xScale: ScaleTime<number, number, never>;
	yScale: ScaleLinear<number, number, never>;
	innerHeight: number;
}) => {
	return (
		<>
			{binnedData.map((d, i) => (
				<rect
					key={i}
					x={xScale(d.x0!)}
					y={yScale(d.y)}
					width={xScale(d.x1!) - xScale(d.x0!)}
					height={innerHeight - yScale(d.y)}
					fill="#137B80"
				>
					<title>{d.y}</title>
				</rect>
			))}
		</>
	);
};
