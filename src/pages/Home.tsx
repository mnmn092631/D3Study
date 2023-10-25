import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<Link to="/faces">Faces - arc, range</Link>
			<br />
			<Link to="/csvdata">CSVData - csvParse, csv, csvFormat, pie</Link>
			<br />
			<Link to="/barchart">
				BarChart - max, scaleBand, scaleLinear, ticks, domain, innerPadding,
				format
			</Link>
			<br />
			<Link to="/scatterplot">Scatter Plot - extent, nice</Link>
		</div>
	);
};

export default Home;
