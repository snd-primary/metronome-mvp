import { css } from "../../../styled-system/css";

export const BpmIndicator = () => {
	return (
		<div
			className={css({
				display: "grid",
				w: "full",
				h: "full",
				placeContent: "center",
				placeItems: "center",
			})}
		>
			<output
				className={css({
					fontFamily: "orbitron",
					display: "grid",
					justifyContent: "center",
					alignItems: "baseline",
					textAlign: "center",
					gap: 0,
				})}
			>
				<span
					className={css({
						fontSize: "8xl",
						fontWeight: "600",
						lineHeight: "tight",
					})}
				>
					123
				</span>
				<span
					className={css({
						fontSize: "3xl",
					})}
				>
					BPM
				</span>
			</output>
		</div>
	);
};
