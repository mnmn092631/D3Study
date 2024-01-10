import { LegendOptions, Series } from "type/type";
import { D3_DEFAULT_COLORS } from ".";
import * as S from "style/style";

type LegendProps = LegendOptions & { series: Series[] };

const Legend = ({ series, labelColor = "#000" }: LegendProps) => {
	const colors = D3_DEFAULT_COLORS;

	return (
		<S.LegendContainer>
			{series.map((sr, idx) => (
				<div key={`multiline-legend-${idx}`}>
					<S.LegendColorBox $color={sr.color || colors[idx % colors.length]} />
					<S.LegendText $color={labelColor}>{sr.label ?? ""}</S.LegendText>
				</div>
			))}
		</S.LegendContainer>
	);
};

export default Legend;
