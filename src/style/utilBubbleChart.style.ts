import styled from "@emotion/styled";

export const UtilBubbleChartContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const LegendContainer = styled.div`
	display: flex;

	& > div {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 15px;

		&:last-child {
			margin-right: 0;
		}
	}
`;

export const LegendText = styled.p<{ $color: string }>`
	margin: 5px 0;
	color: ${({ $color }) => $color};
	text-transform: uppercase;
`;

export const LegendColorBox = styled.div<{ $color: string }>`
	width: 20px;
	height: 20px;
	margin-right: 10px;
	background-color: ${({ $color }) => $color};
`;
