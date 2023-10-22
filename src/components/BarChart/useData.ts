import { DSVParsedArray, csv } from "d3";
import { useEffect, useState } from "react";

export interface Data {
	Country: string;
	Population: number;
}

const csvUrl =
	"https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/UN_Population_2019.csv";

export const useData = () => {
	const [data, setData] = useState<DSVParsedArray<Data> | null>(null);

	useEffect(() => {
		const row = (d: any) => {
			d.Population = +d["2020"];
			return d;
		};
		csv(csvUrl, row).then((data) => {
			setData(data.slice(0, 10) as DSVParsedArray<Data>);
		});
	}, []);

	return data;
};
