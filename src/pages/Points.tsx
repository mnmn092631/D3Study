import { Marks } from "components/Points/Marks";
import { CitiesData, useCities } from "components/Points/useCities";
import { useWorldAtlas } from "components/Points/useWorldAtlas";
import { max, scaleSqrt } from "d3";

const Points = ({ width, height }: { [key: string]: number }) => {
	const worldAtlas = useWorldAtlas();
	const cities = useCities();

	if (!worldAtlas || !cities) return <p>Loading...</p>;

	const sizeValue = (d: CitiesData) => d.population;
	const maxRadius = 15;

	const sizeScale = scaleSqrt()
		.domain([0, max(cities, sizeValue)] as number[])
		.range([0, maxRadius]);

	return (
		<svg width={width} height={height}>
			<Marks
				worldAtlas={worldAtlas}
				cities={cities}
				sizeScale={sizeScale}
				sizeValue={sizeValue}
			/>
		</svg>
	);
};

export default Points;
