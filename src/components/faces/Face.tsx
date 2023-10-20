import { BackgroundCircle } from "components/faces/BackgroundCircle";
import { Eyes } from "components/faces/Eyes";
import { FaceContainer } from "components/faces/FaceContainer";
import { Mouth } from "components/faces/Mouth";

export const Face = ({
	width,
	height,
	centerX,
	centerY,
	strokeWidth,
	eyeOffsetX,
	eyeOffsetY,
	eyeRadius,
	mouthRadius,
	mouthWidth,
}: {
	[key: string]: number;
}) => (
	<FaceContainer
		width={width}
		height={height}
		centerX={centerX}
		centerY={centerY}
	>
		<BackgroundCircle
			radius={centerY - strokeWidth / 2}
			strokeWidth={strokeWidth}
		/>
		<Eyes
			eyeOffsetX={eyeOffsetX}
			eyeOffsetY={eyeOffsetY}
			eyeRadius={eyeRadius}
		/>
		<Mouth mouthRadius={mouthRadius} mouthWidth={mouthWidth} />
	</FaceContainer>
);
