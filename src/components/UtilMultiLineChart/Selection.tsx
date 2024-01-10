import { ScaleLinear, ScalePoint } from "d3";
import { Series, SelectedItem, SelectionOptions } from "type/utilMultiLineChart";
import Dots from "./Dots";
import { D3_DEFAULT_COLORS } from ".";

type SelectionProps = SelectionOptions & {
	xAxis: string[] | number[];
	innerHeight: number;
	xScale: ScalePoint<string> | ScaleLinear<number, number, never>;
	yScale: ScaleLinear<number, number, null>;
	selected: (SelectedItem | null)[] | null;
	series: Series[];
};

const Selection = ({
	xAxis,
	innerHeight,
	xScale,
	yScale,
	selected,
	series,
	verticalLineColor = "gray",
	dot,
}: SelectionProps) => {
	const firstItem = selected?.find((it) => !!it);

	if (!firstItem) return null;

	const colors = series.map((sr, i) => sr.color || D3_DEFAULT_COLORS[i % D3_DEFAULT_COLORS.length]);

	let x: number;

	switch (typeof xAxis[0]) {
		case "string":
			x = (xScale as ScalePoint<string>)(firstItem.label as string)!;
			break;
		case "number":
			x = (xScale as ScaleLinear<number, number, never>)(firstItem.label as number);
			break;
	}

	return (
		<g>
			<line x1={x} x2={x} y2={innerHeight} stroke={verticalLineColor} strokeDasharray="5, 5" />
			<Dots {...dot} selected={selected} xScale={xScale} yScale={yScale} colors={colors} />
		</g>
	);
};

export default Selection;
