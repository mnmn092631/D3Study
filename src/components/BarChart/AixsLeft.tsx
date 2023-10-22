import { ScaleBand } from "d3";

export const AxisLeft = ({ yScale }: { yScale: ScaleBand<string> }) => {
	return (
		<>
			{yScale.domain().map((domainValue) => (
				<text
					key={domainValue}
					dy=".32em"
					x={-3}
					y={yScale(domainValue)! + yScale.bandwidth() / 2}
					style={{ textAnchor: "end" }}
					fill="#635F5D"
				>
					{domainValue}
				</text>
			))}
		</>
	);
};
