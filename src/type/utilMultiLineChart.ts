export type SelectedItem = { found: number; label: string | number | undefined } & { seriesIndex: number };

export interface Series {
	data: number[];
	label: string;
	color?: string;
	lineWidth?: number;
}

export interface PaneOptions {
	width: number;
	height: number;
	margin: {
		top: number;
		right: number;
		bottom: number;
		left: number;
	};
}

export interface YAxisOptions {
	axisLabel?: string;
	axisLabelColor?: string;
	tickColor?: string;
	tickLabelColor?: string;
}

export interface XAxisOptions extends YAxisOptions {
	data: string[] | number[];
	tickWidth?: number;
}

export interface LinesOptions {
	colors?: string[];
	lineWidth?: number;
}

export interface LegendOptions {
	labelColor?: string;
}

export interface SelectionOptions {
	verticalLineColor?: string;

	dot?: {
		radius?: number;
		borderWidth?: number;
		backgroundColor?: string;
	};

	tooltip?: {
		backgroundColor?: string;
		borderColor?: string;
		xValueTextColor?: string;
		yValueTextColor?: string;
		legendTextColor?: string;
	};
}
