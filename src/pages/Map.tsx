import { Marks } from "components/Map/Marks";
import { useData } from "components/Map/useData";

const Map = ({ width, height }: { [key: string]: number }) => {
	const data = useData();

	if (!data) return <p>Loading...</p>;

	return (
		<svg width={width} height={height}>
			<Marks data={data} />
		</svg>
	);
};

export default Map;
