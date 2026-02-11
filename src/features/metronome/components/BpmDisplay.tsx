import { css } from "../../../../styled-system/css";

type Props = {
	bpm: number;
};

export const BpmDisplay: React.FC<Props> = ({ bpm }) => {
	return (
		<div
			className={css({
				display: "grid",
				justifyItems: "center",
				color: "lamp",
			})}
		>
			<output
				className={css({
					fontSize: "7xl",
					lineHeight: "1",
				})}
			>
				{bpm}
			</output>
			<span
				className={css({
					fontSize: "lg",
					fontWeight: "bold",
					textTransform: "uppercase",
					letterSpacing: "0.2em",
				})}
			>
				BPM
			</span>
		</div>
	);
};
