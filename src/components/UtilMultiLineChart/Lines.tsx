import { Line, ScaleLinear, ScalePoint } from "d3";
import { LinesOptions, SelectionOptions, Series } from "type/type";
import { D3_DEFAULT_COLORS } from ".";

type LinesProps = LinesOptions &
	SelectionOptions["dot"] & {
		series: Series[];
		lineFunc: Line<number>;
		xAxis: string[] | number[];
		xScale?: ScalePoint<string> | ScaleLinear<number, number, never>;
		yScale?: ScaleLinear<number, number, never>;
	};

const Lines = ({
	series,
	lineFunc,
	xAxis,
	xScale,
	yScale,
	colors = D3_DEFAULT_COLORS,
	lineWidth = 2,
	radius = 5,
	borderWidth = 2,
	backgroundColor = "#FFF",
}: LinesProps) => {
	return (
		<g>
			{series.map(
				(sr, i) =>
					lineFunc(sr.data) && (
						<path
							key={i}
							d={lineFunc(sr.data) ?? undefined}
							stroke={sr.color || colors[i % colors.length]}
							strokeLinecap="round"
							fill="transparent"
							strokeWidth={sr.lineWidth || lineWidth}
						/>
					)
			)}
			{xScale &&
				yScale &&
				series.map((sr, idx) =>
					sr.data.map((data, i) => (
						<circle
							key={i}
							cx={xScale!(xAxis[i] as string & { valueOf(): number }) as number}
							cy={yScale(data)}
							r={radius}
							stroke={sr.color || colors[idx % colors.length]}
							strokeWidth={borderWidth || sr.lineWidth}
							fill={backgroundColor}
						/>
					))
				)}
		</g>
	);
};

export default Lines;
