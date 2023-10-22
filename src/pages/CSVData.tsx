import { useEffect, useState } from "react";
import { DSVRowArray, arc, csv, pie } from "d3";
import { message } from "components/CSVData/message";

const width = 960;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;

const csvUrl =
	"https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

const pieArc = arc().innerRadius(0).outerRadius(width);

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

	const colorPie = pie().value(1);

	if (!data) return <p>Loading...</p>;

	return (
		<>
			<h3>{message(data)}</h3>
			<svg width={width} height={height}>
				<g transform={`translate(${centerX},${centerY})`}>
					{colorPie(data as any).map((d, i) => (
						<path
							key={i}
							fill={(d.data as { [key: string]: any })["RGB hex value"]}
							d={pieArc(d as any)!}
						/>
					))}
				</g>
			</svg>
		</>
	);
};

export default CSVData;
