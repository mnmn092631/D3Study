import { DSVParsedArray, csv } from "d3";
import { useEffect, useState } from "react";

export interface IrisData {
	sepal_length: number;
	sepal_width: number;
	petal_length: number;
	petal_width: number;
	species: string;
}

const csvUrl =
	"https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/iris.csv";

export const useData = () => {
	const [data, setData] = useState<DSVParsedArray<IrisData> | null>(null);

	useEffect(() => {
		const row = (d: any) => {
			d.sepal_length = +d.sepal_length;
			d.sepal_width = +d.sepal_width;
			d.petal_length = +d.petal_length;
			d.petal_width = +d.petal_width;
			return d;
		};
		csv(csvUrl, row).then(setData);
	}, []);

	return data;
};
