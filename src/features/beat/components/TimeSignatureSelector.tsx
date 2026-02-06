import { css } from "../../../../styled-system/css";

export const TimeSignatureSelector = () => {
	return (
		<div className={css({})}>
			<button
				type="button"
				className={css({
					fontSize: "5xl",
					fontWeight: "bold",
					cursor: "pointer",
				})}
			>
				4/4
			</button>
		</div>
	);
};
