import { Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import Faces from "pages/Faces";
import CSVData from "pages/CSVData";
import BarChart from "pages/BarChart";

function App() {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="/faces" element={<Faces />} />
			<Route path="/csvdata" element={<CSVData width={960} height={500} />} />
			<Route path="/barchart" element={<BarChart width={960} height={500} />} />
		</Routes>
	);
}

export default App;
