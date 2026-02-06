import { css } from "../../../../styled-system/css";

const ACCENT_COLOR = "oklch(0.75 0.12 110)";
const DIM_COLOR = "oklch(0.35 0.06 110)";

const TICK_COUNT = 31;
const CENTER = Math.floor(TICK_COUNT / 2);
const TICK_HEIGHT = 36;
const CENTER_TICK_HEIGHT = 50;

export const BpmSlider = () => {
	return (
		<div
			className={css({
				display: "grid",
				gap: 2,
			})}
		>
			{/* -/+ ボタン + ティックバー */}
			<div
				className={css({
					display: "grid",
					gridTemplateColumns: "auto 1fr auto",
					alignItems: "center",
					gap: 3,
				})}
			>
				{/* マイナスボタン */}
				<button
					type="button"
					className={css({
						display: "grid",
						placeItems: "center",
						cursor: "pointer",
						background: "none",
						border: "none",
					})}
				>
					<svg width="24" height="24" viewBox="0 0 24 24">
						<circle
							cx="12"
							cy="12"
							r="11"
							fill="none"
							stroke={DIM_COLOR}
							strokeWidth="1"
						/>
						<line
							x1="7"
							y1="12"
							x2="17"
							y2="12"
							stroke={ACCENT_COLOR}
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</button>

				{/* ティックマークバー（グラデーションオーバーレイ付き） */}
				<div
					className={css({
						position: "relative",
						w: "full",
						_after: {
							content: '""',
							position: "absolute",
							inset: 0,
							background:
								"linear-gradient(to right, var(--colors-background) 0%, transparent 30%, transparent 70%, var(--colors-background) 100%)",
							pointerEvents: "none",
						},
					})}
				>
					<svg
						viewBox={`0 0 ${TICK_COUNT * 6} 50`}
						className={css({ w: "full", h: "40px", display: "block" })}
						preserveAspectRatio="none"
					>
						{/* 中央ガイドライン（上） */}
						<line
							x1={CENTER * 6 + 3}
							y1={0}
							x2={CENTER * 6 + 3}
							y2={25 - CENTER_TICK_HEIGHT / 2 - 2}
							stroke={ACCENT_COLOR}
							strokeWidth="1"
							opacity="0.5"
						/>
						{/* 中央ガイドライン（下） */}
						<line
							x1={CENTER * 6 + 3}
							y1={25 + CENTER_TICK_HEIGHT / 2 + 2}
							x2={CENTER * 6 + 3}
							y2={50}
							stroke={ACCENT_COLOR}
							strokeWidth="1"
							opacity="0.5"
						/>
						{Array.from({ length: TICK_COUNT }, (_, i) => {
							const isCenter = i === CENTER;
							const height = isCenter ? CENTER_TICK_HEIGHT : TICK_HEIGHT;
							const x = i * 7 - 18;
							const y = 25 - height / 2;
							return (
								<rect
									key={i}
									x={x}
									y={y}
									width={isCenter ? 4.5 : 3}
									height={height}
									rx="4"
									fill={ACCENT_COLOR}
								/>
							);
						})}
					</svg>
				</div>

				{/* プラスボタン */}
				<button
					type="button"
					className={css({
						display: "grid",
						placeItems: "center",
						cursor: "pointer",
						background: "none",
						border: "none",
					})}
				>
					<svg width="24" height="24" viewBox="0 0 24 24">
						<circle
							cx="12"
							cy="12"
							r="11"
							fill="none"
							stroke={DIM_COLOR}
							strokeWidth="1"
						/>
						<line
							x1="7"
							y1="12"
							x2="17"
							y2="12"
							stroke={ACCENT_COLOR}
							strokeWidth="2"
							strokeLinecap="round"
						/>
						<line
							x1="12"
							y1="7"
							x2="12"
							y2="17"
							stroke={ACCENT_COLOR}
							strokeWidth="2"
							strokeLinecap="round"
						/>
					</svg>
				</button>
			</div>

			{/* BPM値表示 */}
			<div
				className={css({
					color: "lamp",
					display: "flex",

					alignItems: "baseline",
					gap: 2,
				})}
			>
				<span
					className={css({
						fontSize: "3xl",
					})}
				>
					120
				</span>
				<span
					className={css({
						fontSize: "sm",
					})}
				>
					bpm
				</span>
			</div>
		</div>
	);
};
