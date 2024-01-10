import UtilBubbleChart from "components/UtilBubbleChart";
import data from "components/UtilBubbleChart/data";

const BubbleChart = () => {
	return (
		<>
			<div style={{ width: "80%", margin: "0 auto" }}>
				<p style={{ textAlign: "center" }}>scaleLinear</p>
				<UtilBubbleChart
					xAxisOptions={{
						data: data.result.reduce((acc, cur) => [...acc, cur.A], [] as number[]),
						axisLabel: data.label.x,
						tickWidth: 50,
					}}
					yAxisOptions={{
						data: data.result.reduce((acc, cur) => [...acc, cur.B], [] as number[]),
						axisLabel: data.label.y,
					}}
					zAxisOptions={{
						data: data.result.reduce((acc, cur) => [...acc, cur.z], [] as number[]),
						range: [0, 15],
					}}
					colorOptions={{
						data: data.result.reduce((acc, cur) => [...acc, cur.color], [] as string[]),
						domain: ["red", "blue", "green"],
						colorRange: ["red", "blue", "green"],
					}}
					paneOptions={{ width: 800, height: 400, margin: { top: 10, right: 10, bottom: 60, left: 75 } }}
				/>
			</div>
			<div style={{ width: "80%", margin: "0 auto" }}>
				<p style={{ textAlign: "center" }}>scaleTime</p>
				<UtilBubbleChart
					xAxisOptions={{
						data: data.result.reduce((acc, cur) => [...acc, new Date(cur.date)], [] as Date[]),
						tickWidth: 120,
					}}
					yAxisOptions={{
						data: data.result.reduce((acc, cur) => [...acc, cur.z], [] as number[]),
					}}
					colorOptions={{
						data: data.result.reduce((acc, cur) => [...acc, cur.color], [] as string[]),
						domain: ["red", "blue", "green"],
						colorRange: ["red", "blue", "green"],
					}}
					paneOptions={{ width: 1200, height: 400, margin: { top: 10, right: 40, bottom: 60, left: 50 } }}
				/>
			</div>
		</>
	);
};

export default BubbleChart;
