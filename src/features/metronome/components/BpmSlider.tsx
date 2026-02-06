import { css } from "../../../../styled-system/css";

const ACCENT_COLOR = "oklch(0.75 0.12 110)";
const DIM_COLOR = "oklch(0.35 0.06 110)";

// ティックマークの高さを生成（中央が高く、端が低いベルカーブ）
const TICK_COUNT = 31;
const ticks = Array.from({ length: TICK_COUNT }, (_, i) => {
	const center = (TICK_COUNT - 1) / 2;
	const distance = Math.abs(i - center) / center;
	const height = 8 + (1 - distance * distance) * 32;
	return height;
});

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

				{/* ティックマークバー */}
				<svg
					viewBox={`0 0 ${TICK_COUNT * 6} 50`}
					className={css({ w: "full", h: "40px" })}
					preserveAspectRatio="none"
				>
					{ticks.map((height, i) => {
						const x = i * 6 + 3;
						const y = 25 - height / 2;
						const isCenter = i === Math.floor(TICK_COUNT / 2);
						return (
							<rect
								key={i}
								x={x - 1}
								y={y}
								width={isCenter ? 3 : 2}
								height={height}
								rx="1"
								fill={ACCENT_COLOR}
								opacity={isCenter ? 1 : 0.7}
							/>
						);
					})}
					{/* 中央インジケーターライン */}
					<line
						x1={(TICK_COUNT * 6) / 2}
						y1="0"
						x2={(TICK_COUNT * 6) / 2}
						y2="50"
						stroke={ACCENT_COLOR}
						strokeWidth="1"
						opacity="0.3"
					/>
				</svg>

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
					display: "grid",
					gridTemplateColumns: "auto auto",
					justifyContent: "start",
					alignItems: "baseline",
					gap: 1,
					color: "lamp",
				})}
			>
				<span
					className={css({
						fontSize: "3xl",
						fontWeight: "bold",
						fontStyle: "italic",
						fontFamily: "orbitron",
					})}
				>
					120
				</span>
				<span
					className={css({
						fontSize: "sm",
						fontFamily: "orbitron",
					})}
				>
					bpm
				</span>
			</div>
		</div>
	);
};
