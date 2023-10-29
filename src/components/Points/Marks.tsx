import { FeatureCollection, MultiLineString } from "geojson";
import {
	geoNaturalEarth1,
	geoPath,
	geoGraticule,
	DSVParsedArray,
	ScalePower,
} from "d3";
import { CitiesData } from "./useCities";

const projection = geoNaturalEarth1();
const path = geoPath(projection);
const graticule = geoGraticule();

export const Marks = ({
	worldAtlas,
	cities,
	sizeScale,
	sizeValue,
}: {
	worldAtlas: {
		land: FeatureCollection;
		interiors: MultiLineString;
	};
	cities: DSVParsedArray<CitiesData>;
	sizeScale: ScalePower<number, number, never>;
	sizeValue: (d: CitiesData) => number;
}) => {
	const { land, interiors } = worldAtlas;
	return (
		<g>
			<path d={path({ type: "Sphere" }) || ""} fill="#faf9f9" />
			<path d={path(graticule()) || ""} fill="none" stroke="#e8e8e8" />
			{land.features.map((feature, i) => (
				<path key={i} d={path(feature) || ""} fill="#e4e4e4" />
			))}
			<path d={path(interiors) || ""} fill="none" stroke="#c3c3c3" />
			{cities.map((d, i) => {
				const [x, y] = projection([d.lng, d.lat]) as number[];
				return (
					<circle
						key={d.city + i}
						cx={x}
						cy={y}
						r={sizeScale(sizeValue(d))}
						fill="#137B80"
						opacity={0.3}
					/>
				);
			})}
		</g>
	);
};
