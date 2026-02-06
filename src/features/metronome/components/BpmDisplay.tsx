import { css } from "../../../../styled-system/css";

export const BpmDisplay = () => {
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
					fontSize: "8xl",
					fontWeight: "bold",
					lineHeight: "1",
				})}
			>
				120
			</output>
			<span
				className={css({
					fontSize: "xs",
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
