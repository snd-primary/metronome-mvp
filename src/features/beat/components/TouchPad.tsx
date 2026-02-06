import { css } from "../../../../styled-system/css";

export const TouchPad = () => {
	return (
		<div
			className={css({
				w: "full",
				aspectRatio: "4/3",
				borderRadius: "20px",
				position: "relative",
				overflow: "hidden",
				cursor: "pointer",
				// ベース背景: ダークグレー
				bg: "oklch(0.18 0 0)",
				border: "1px solid oklch(0.3 0 0)",
				// タッチフィードバック用
				transition: "background 0.1s ease",
				_active: {
					bg: "oklch(0.22 0 0)",
				},
			})}
		>
			{/* クロスハッチパターンをSVGで描画 */}
			<svg
				className={css({
					position: "absolute",
					inset: 0,
					w: "full",
					h: "full",
					pointerEvents: "none",
				})}
				preserveAspectRatio="none"
			>
				<defs>
					<pattern
						id="crosshatch"
						width="14"
						height="14"
						patternUnits="userSpaceOnUse"
					>
						{/* 小さな × マーク */}
						<line
							x1="5"
							y1="5"
							x2="9"
							y2="9"
							stroke="oklch(0.32 0 0)"
							strokeWidth="0.8"
							strokeLinecap="round"
						/>
						<line
							x1="9"
							y1="5"
							x2="5"
							y2="9"
							stroke="oklch(0.32 0 0)"
							strokeWidth="0.8"
							strokeLinecap="round"
						/>
					</pattern>
				</defs>
				<rect width="100%" height="100%" fill="url(#crosshatch)" />
			</svg>
		</div>
	);
};
