import { FeatureCollection, MultiLineString } from "geojson";
import { geoNaturalEarth1, geoPath, geoGraticule } from "d3";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
	data,
}: {
	data: {
		land: FeatureCollection;
		interiors: MultiLineString;
	};
}) => {
	const { land, interiors } = data;
	return (
		<g>
			<path d={path({ type: "Sphere" }) || ""} fill="#ECECEC" />
			<path d={path(graticule()) || ""} fill="none" stroke="#DADADA" />
			{land.features.map((feature) => (
				<path d={path(feature) || ""} fill="#137B80" />
			))}
			<path d={path(interiors) || ""} fill="none" stroke="#339498" />
		</g>
	);
};
