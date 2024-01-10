import { Series, SelectedItem, SelectionOptions } from "type/type";
import { format } from "d3";
import { D3_DEFAULT_COLORS } from ".";
import * as S from "style/style";

type TooltipProps = SelectionOptions["tooltip"] & {
	selected: (SelectedItem | null)[] | null;
	series: Series[];
	coord: [number, number];
};

const Tooltip = ({
	selected,
	series,
	coord,
	backgroundColor = "#fff",
	borderColor = "#000",
	xValueTextColor = "#000",
	yValueTextColor = "#000",
	legendTextColor = "#000",
}: TooltipProps) => {
	if (!selected) return null;

	const colors = D3_DEFAULT_COLORS;

	return (
		<S.TooltipContainer
			$top={coord[1] - window.scrollY + 25}
			$left={coord[0] + 20}
			$backgroundColor={backgroundColor}
			$borderColor={borderColor}
		>
			<S.TooltipXValueText $color={xValueTextColor}>
				{typeof selected[0]?.label === "number" ? format(",d")(selected[0]?.label as number) : selected[0]?.label}
			</S.TooltipXValueText>

			<hr />

			{selected.map((item, i) =>
				!item ? null : (
					<S.TooltipContentContainer
						key={item.seriesIndex}
						$backgroundColor={series[i].color || colors[i % colors.length]}
						$legendTextColor={legendTextColor}
						$yValueTextColor={yValueTextColor}
					>
						<div />
						<span>{series[i].label}</span>
						<strong>{item.found}</strong>
					</S.TooltipContentContainer>
				)
			)}
		</S.TooltipContainer>
	);
};

export default Tooltip;
