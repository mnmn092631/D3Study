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

interface AxisOptions {
	axisLabel?: string;
	axisLabelColor?: string;
	tickColor?: string;
	tickLabelColor?: string;
}

export interface XAxisOptions extends AxisOptions {
	data: Date[] | number[];
	tickWidth?: number;
}

export interface YAxisOptions extends AxisOptions {
	data: number[];
}

export interface ZAxisOptions extends Omit<AxisOptions, "axisLabel"> {
	data: number[];
	range: [number, number];
}

export interface ColorOptions {
	data: string[];
	domain: string[];
	colorRange: string[];
}

export interface LegendOptions {
	labelColor?: string;
}
