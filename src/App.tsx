import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Faces from "pages/Faces";
import CSVData from "pages/CSVData";
import BarChart from "pages/BarChart";
import ScatterPlot from "pages/ScatterPlot";
import LineChart from "pages/LineChart";
import Map from "pages/Map";
import Menus from "pages/Menus";
import Points from "pages/Points";
import Histogram from "pages/Histogram";

function App() {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="/faces" element={<Faces />} />
			<Route path="/csvdata" element={<CSVData width={960} height={500} />} />
			<Route path="/barchart" element={<BarChart width={960} height={500} />} />
			<Route
				path="/scatterplot"
				element={<ScatterPlot width={960} height={500} />}
			/>
			<Route
				path="/linechart"
				element={<LineChart width={960} height={500} />}
			/>
			<Route path="/map" element={<Map width={960} height={500} />} />
			<Route path="/menus" element={<Menus width={960} height={500} />} />
			<Route path="/points" element={<Points width={960} height={500} />} />
			<Route
				path="/histogram"
				element={<Histogram width={960} height={500} />}
			/>
		</Routes>
	);
}

export default App;
