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
					fontFamily: "orbitron",
					fontWeight: "bold",
				})}
			>
				<output
					className={css({
						fontSize: "7xl",
					})}
				>
					120
				</output>
				<span
					className={css({
						fontSize: "xl",
					})}
				>
					bpm
				</span>
			</span>
		</div>
	);
};
