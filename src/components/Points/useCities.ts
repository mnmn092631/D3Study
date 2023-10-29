import { DSVParsedArray, csv } from "d3";
import { useEffect, useState } from "react";

export interface CitiesData {
	city: string;
	lat: number;
	lng: number;
	country: string;
	population: number;
}

const csvUrl =
	"https://gist.githubusercontent.com/curran/13d30e855d48cdd6f22acdf0afe27286/raw/worldcities_clean.csv";

export const useCities = () => {
	const [data, setData] = useState<DSVParsedArray<CitiesData> | null>(null);

	useEffect(() => {
		const row = (d: any) => {
			d.lat = +d.lat;
			d.lng = +d.lng;
			d.population = +d.population;
			return d;
		};
		csv(csvUrl, row).then(setData);
	}, []);

	return data;
};
