import { DSVParsedArray, csv } from "d3";
import { useEffect, useState } from "react";

export interface TemperatureData {
	timestamp: Date;
	temperature: number;
}

const csvUrl =
	"https://gist.githubusercontent.com/curran/90240a6d88bdb1411467b21ea0769029/raw/week_temperature_sf.csv";

export const useData = () => {
	const [data, setData] = useState<DSVParsedArray<TemperatureData> | null>(
		null
	);

	useEffect(() => {
		const row = (d: any) => {
			d.temperature = +d.temperature;
			d.timestamp = new Date(d.timestamp);
			return d;
		};
		csv(csvUrl, row).then(setData);
	}, []);

	return data;
};
