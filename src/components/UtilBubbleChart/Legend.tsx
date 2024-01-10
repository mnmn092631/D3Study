import { ScaleOrdinal } from "d3";
import * as S from "style/utilBubbleChart.style";
import { LegendOptions } from "type/utilBubbleChart";

type LegendProps = LegendOptions & {
	domain: string[];
	colorScale: ScaleOrdinal<string, unknown, never>;
};

const Legend = ({ domain, colorScale, labelColor = "black" }: LegendProps) => {
	return (
		<S.LegendContainer>
			{domain.map((color, i) => (
				<div key={i}>
					<S.LegendColorBox $color={colorScale(color) as string} />
					<S.LegendText $color={labelColor}>{color ?? ""}</S.LegendText>
				</div>
			))}
		</S.LegendContainer>
	);
};

export default Legend;
