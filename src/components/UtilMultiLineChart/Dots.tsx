import { ScaleLinear, ScalePoint } from "d3";
import { SelectedItem, SelectionOptions } from "type/utilMultiLineChart";

type DotsProps = SelectionOptions["dot"] & {
	selected: (SelectedItem | null)[] | null;
	xScale: ScalePoint<string> | ScaleLinear<number, number, never>;
	yScale: ScaleLinear<number, number, null>;
	colors: string[];
};

const Dots = ({ selected, xScale, yScale, colors, radius = 5 }: DotsProps) => {
	return (
		<>
			{selected?.map((item) =>
				!item ? null : (
					<circle
						key={item.seriesIndex}
						cx={xScale(item.label as string & { valueOf(): number })}
						cy={yScale(item.found)!}
						r={radius}
						fill={colors[item.seriesIndex % colors.length]}
					/>
				)
			)}
		</>
	);
};

export default Dots;
