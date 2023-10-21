import { DSVRowArray, csvFormat } from "d3";

export const message = (data: DSVRowArray<string>) => {
	let message = "";
	message += Math.round(csvFormat(data).length / 1024) + " kB ";
	message += data.length + " rows ";
	message += data.columns.length + " columns";
	return message;
};
