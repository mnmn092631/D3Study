import React from "react";
import Faces from "pages/Faces";
import Home from "pages/Home";
import { Routes, Route } from "react-router-dom";
import CSVData from "pages/CSVData";

function App() {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="/faces" element={<Faces />} />
			<Route path="/csvdata" element={<CSVData />} />
		</Routes>
	);
}

export default App;
