import UtilMultiLineChart from "components/UtilMultiLineChart";
import pointData from "components/UtilMultiLineChart/pointData";
import linearData from "components/UtilMultiLineChart/linearData";

const MultiLineChart = () => {
	return (
		<>
			<div style={{ width: "80%", margin: "0 auto" }}>
				<p style={{ textAlign: "center" }}>scalePoint</p>
				<UtilMultiLineChart
					series={[
						{ data: pointData.A, label: "A", color: "#02b2af" },
						{ data: pointData.B, label: "B", color: "#72ccff" },
					]}
					paneOptions={{ width: 1200, height: 400, margin: { top: 20, right: 40, bottom: 70, left: 50 } }}
					xAxisOptions={{ data: pointData.xLabels }}
				/>
			</div>
			<div style={{ width: "80%", margin: "0 auto" }}>
				<p style={{ textAlign: "center" }}>scaleLinear</p>
				<UtilMultiLineChart
					series={[
						{ data: linearData.A, label: "A" },
						{ data: linearData.B, label: "B" },
						{ data: linearData.C, label: "C" },
						{ data: linearData.D, label: "D" },
						{ data: linearData.E, label: "E" },
					]}
					paneOptions={{ width: 850, height: 450, margin: { top: 15, right: 20, bottom: 55, left: 70 } }}
					xAxisOptions={{ data: linearData.xaxis, axisLabel: "xLabel" }}
					yAxisOptions={{ axisLabel: "yLabel" }}
				/>
			</div>
		</>
	);
};

export default MultiLineChart;
