import { json } from "d3";
import { useEffect, useState } from "react";
import { feature, mesh } from "topojson-client";
import { FeatureCollection, MultiLineString } from "geojson";
import { Topology, Objects } from "topojson-specification";

const jsonUrl = "https://unpkg.com/world-atlas@2.0.2/countries-50m.json";

export const useData = () => {
	const [data, setData] = useState<{
		land: FeatureCollection;
		interiors: MultiLineString;
	} | null>(null);

	useEffect(() => {
		json<Topology<Objects>>(jsonUrl).then((topology) => {
			const { countries, land } = topology!.objects;
			setData({
				land: feature(topology!, land) as FeatureCollection,
				interiors: mesh(topology!, countries, (a, b) => a !== b),
			});
		});
	}, []);

	return data;
};
