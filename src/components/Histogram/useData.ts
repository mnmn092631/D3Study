import { DSVParsedArray, csv } from "d3";
import { useEffect, useState } from "react";

export interface MissingData {
	"Reported Date": Date;
	"Total Dead and Missing": number;
	"Location Coordinates": string;
}

const csvUrl =
	"https://gist.githubusercontent.com/curran/a9656d711a8ad31d812b8f9963ac441c/raw/MissingMigrants-Global-2019-10-08T09-47-14-subset.csv";

export const useData = () => {
	const [data, setData] = useState<DSVParsedArray<MissingData> | null>(null);

	useEffect(() => {
		const row = (d: any) => {
			d["Total Dead and Missing"] = +d["Total Dead and Missing"];
			d["Reported Date"] = new Date(d["Reported Date"]);
			return d;
		};
		csv(csvUrl, row).then(setData);
	}, []);

	return data;
};
