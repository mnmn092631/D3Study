import { BackgroundCircle } from "components/Faces/BackgroundCircle";
import { Eyes } from "components/Faces/Eyes";
import { FaceContainer } from "components/Faces/FaceContainer";
import { Mouth } from "components/Faces/Mouth";

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
