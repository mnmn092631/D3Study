import { scalePoint, scaleLinear, min, max, bisector, ScalePoint, ScaleLinear } from "d3";
import { Series } from "type/utilMultiLineChart";

interface GetLinearScaleParam {
	series: Series[] | number[] | undefined;
	range: [number, number];
	domainMin?: number;
	domainMax?: number;
}

export const getLinearScale = ({ series, range, domainMin, domainMax }: GetLinearScaleParam) => {
	if (!series?.length) return null;
	if (range[0] === 0 && range[1] === 0) return null;

	let allData: Series["data"] | number[];
	if (typeof series[0] === "number") allData = series as number[];
	else allData = (series as Series[]).reduce((acc, sr) => [...acc, ...sr.data], [] as Series["data"]);

	const scale = scaleLinear()
		.domain([domainMin || min(allData)!, domainMax || max(allData)!])
		.range(range)
		.nice();

	return scale;
};

export const getPointScale = (xLabel: string[] | undefined, range: [number, number]) => {
	if (!xLabel?.length) return null;
	if (range[0] === 0 && range[1] === 0) return null;

	const scale = scalePoint().domain(xLabel).range(range);

	return scale;
};

const bisect = bisector<number, number>((d) => d).center;

interface findItemsByCoordParams {
	xAxis: string[] | number[];
	series: Series[];
	range: [number, number];
	scale: ScalePoint<string> | ScaleLinear<number, number, never> | null;
	x: number;
	marginLeft: number;
}

export const findItemsByCoord = ({ xAxis, series, range, scale, x, marginLeft }: findItemsByCoordParams) => {
	if (series.length === 0) return null;
	if (!scale) return null;

	let minDistance = range[1] - range[0];
	let label: string | number | undefined = undefined;

	for (let i = 0; i < series.length; i++) {
		let index: number;

		switch (typeof xAxis[0]) {
			case "string":
				index = Math.round((x - marginLeft - range[0]) / ((range[1] - range[0]) / (xAxis.length - 1)));
				break;
			case "number":
				index = bisect(xAxis as number[], (scale as ScaleLinear<number, number, never>).invert(x - marginLeft));
				break;
		}

		const found = series[i].data[index];
		if (found === undefined) continue;

		let distance: number;
		switch (typeof xAxis[0]) {
			case "string":
				distance = Math.abs((scale as ScalePoint<string>)((xAxis as string[])[index])! - x);
				break;
			case "number":
				distance = Math.abs((scale as ScaleLinear<number, number, never>)((xAxis as number[])[index])! - x);
				break;
		}

		if (minDistance > distance) {
			minDistance = distance;
			label = xAxis[index];
		}
	}

	if (!label) return null;

	return series.map((sr, i) => {
		const found = sr.data.find((_, idx) => label === xAxis[idx]);
		if (found === undefined) return null;
		return { found, seriesIndex: i, label };
	});
};
