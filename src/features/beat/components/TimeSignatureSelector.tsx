import { css } from "../../../../styled-system/css";

export const TimeSignatureSelector = () => {
	return (
		<button
			type="button"
			className={css({
				fontSize: "4xl",
				fontWeight: "bold",
				cursor: "pointer",
				color: "lamp",
				background: "none",
				border: "none",
				fontFamily: "orbitron",
			})}
		>
			4/4
		</button>
	);
};
