import styled from "@emotion/styled";

export const UtilMultiLineChartContainer = styled.div`
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

export const TooltipContainer = styled.div<{
	$top: number;
	$left: number;
	$backgroundColor: string;
	$borderColor: string;
}>`
	position: fixed;
	top: ${({ $top }) => $top + "px"};
	left: ${({ $left }) => $left + "px"};
	padding: 10px;
	background-color: ${({ $backgroundColor }) => $backgroundColor};
	border: 1px solid ${({ $borderColor }) => $borderColor};

	& > hr {
		height: 1px;
		border: 0;
		background-color: black;
	}
`;

export const TooltipXValueText = styled.span<{ $color: string }>`
	color: ${({ $color }) => $color};
`;

export const TooltipContentContainer = styled.div<{
	$backgroundColor: string;
	$legendTextColor: string;
	$yValueTextColor: string;
}>`
	display: flex;
	align-items: center;
	margin-bottom: 5px;

	&:last-child {
		margin-bottom: 0;
	}

	& > div {
		display: inline-block;
		width: 8px;
		height: 8px;
		margin-right: 5px;
		border-radius: 50%;
		background-color: ${({ $backgroundColor }) => $backgroundColor};
	}

	& > span {
		margin-right: 20px;
		flex-grow: 1;
		color: ${({ $legendTextColor }) => $legendTextColor};
		text-transform: uppercase;
	}

	& > strong {
		color: ${({ $yValueTextColor }) => $yValueTextColor};
		font-weight: 600;
	}
`;
