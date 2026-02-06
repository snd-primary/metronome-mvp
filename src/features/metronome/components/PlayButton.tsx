import { css } from "../../../../styled-system/css";

const ACCENT_COLOR = "oklch(0.75 0.12 110)";

export const PlayButton = () => {
	return (
		<div
			className={css({
				display: "grid",
				justifyItems: "center",
			})}
		>
			<button
				type="button"
				className={css({
					cursor: "pointer",
					background: "none",
					border: "none",
					display: "grid",
					placeItems: "center",
				})}
			>
				<svg width="48" height="56" viewBox="0 0 48 56">
					<path d="M4 4 L44 28 L4 52 Z" fill={ACCENT_COLOR} />
				</svg>
			</button>
		</div>
	);
};
