import React from "react";
import Faces from "pages/Faces";
import Home from "pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="/face" element={<Faces />} />
		</Routes>
	);
}

export default App;
