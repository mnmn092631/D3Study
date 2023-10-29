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
			<br />
			<Link to="/linechart">
				Line Chart - scaleTime, timeFormat, line, strokeLinejoin, curve,
				strokeLinecap
			</Link>
			<br />
			<Link to="/map">
				Map - json, topojson-client, geoEqualEarth, geoPath, mesh,
				geoNaturalEarth1, geoGraticule
			</Link>
			<br />
			<Link to="/menus">Scatter Plot with Menus - scaleOrdinal</Link>
			<br />
			<Link to="/points">Points on a Map - projection, scaleSqrt</Link>
		</div>
	);
};

export default Home;
