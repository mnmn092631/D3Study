import { useEffect, useState } from "react";
import { DSVRowArray, csv } from "d3";
import { message } from "components/CSVData/message";

const csvUrl =
	"https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

const CSVData = () => {
	const [data, setData] = useState<DSVRowArray<string> | null>(null);

	useEffect(() => {
		// With d3.csv
		csv(csvUrl).then(setData);
	}, []);

	// With fetch, async, and await
	// const fetchText = async (url: string) => {
	// 	const response = await fetch(url);
	// 	return await response.text();
	// };

	// fetchText(csvUrl).then((text) => {
	// 	const data = d3.csvParse(text);
	//  let message = "";
	// 	message += Math.round(text.length / 1024) + " kB\n";
	// 	message += data.length + " rows\n";
	// 	message += data.columns.length + " columns";
	//  console.log(message);
	// });

	return <h3>{data ? message(data) : "loading..."}</h3>;
};

export default CSVData;
