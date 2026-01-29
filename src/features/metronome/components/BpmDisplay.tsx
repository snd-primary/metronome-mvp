import { css } from "../../../../styled-system/css";

export const BpmDisplay = () => {
	return (
		<div>
			<span
				className={css({
					display: "flex",
					gap: 4,
					alignItems: "baseline",
					justifyContent: "center",
				})}
			>
				<output
					className={css({
						fontSize: "6xl",
						fontFamily: "orbitron",
					})}
				>
					120
				</output>
				<span>bpm</span>
			</span>
		</div>
	);
};
