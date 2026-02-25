import { useEffect, useRef, useState } from "react";
import { css } from "../../../../styled-system/css";

const ACCENT_COLOR = "oklch(0.75 0.12 110)";
const DIM_COLOR = "oklch(0.35 0.06 110)";

const TICK_WIDTH = 6;
const TICK_GAP = 4;
const TICK_THRESHOLD = TICK_WIDTH + TICK_GAP;

const TICK_COUNT = 50;

type Props = {
	bpm: number;
	increase: () => void;
	decrease: () => void;
};

export const BpmSlider: React.FC<Props> = ({ increase, decrease, bpm }) => {
	//offsetXはティックバーグループの移動量を保持する
	const [offsetX, setOffsetX] = useState<number>(0);
	const slideBarRef = useRef<HTMLDivElement>(null);
	const isDragging = useRef<boolean>(false);
	const startX = useRef<number>(0);

	//ティックマークバー表示領域の真ん中にあるバーを計算
	const centerTickIndex = TICK_COUNT / 2;

	useEffect(() => {
		const target = slideBarRef.current;

		const handleMouseDown = (e: MouseEvent) => {
			isDragging.current = true;
			startX.current = e.clientX;
			return startX.current;
		};
		target?.addEventListener("mousedown", handleMouseDown);

		const handleMouseMove = (e: MouseEvent) => {
			if (!isDragging.current) return;

			//ドラッグ開始位置から今のマウス位置までの距離（px）
			const moveAmount = e.clientX - startX.current;

			//ティックマークバーの移動量を更新
			setOffsetX(() => moveAmount);

			// 移動量が閾値を超えたらBPMを1づつ増減する
			if (moveAmount >= TICK_THRESHOLD) {
				increase();
				startX.current = e.clientX;
				setOffsetX(0);
			} else if (moveAmount <= -TICK_THRESHOLD) {
				decrease();
				startX.current = e.clientX;
				setOffsetX(0);
			}
		};
		target?.addEventListener("mousemove", handleMouseMove);

		const handleMouseUp = () => {
			isDragging.current = false;
		};
		target?.addEventListener("mouseup", handleMouseUp);

		return () => {
			target?.removeEventListener("mousedown", handleMouseDown);
			target?.removeEventListener("mousemove", handleMouseMove);
			target?.removeEventListener("mouseup", handleMouseUp);
			target?.removeEventListener("mouseleave", handleMouseUp);
		};
	}, [slideBarRef, isDragging, startX, offsetX]);

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
					onClick={decrease}
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
					ref={slideBarRef}
					className={css({
						position: "relative",
						display: "grid",
						background: "red",
						justifyContent: "center",
						w: "full",
						h: 9,
						overflow: "hidden",
						_after: {
							content: '""',
							position: "absolute",
							inset: 0,
							background:
								"linear-gradient(to right, var(--colors-background) 0%, transparent 30%, transparent 70%, var(--colors-background) 100%)",
						},
					})}
				>
					<div
						className={css({
							w: "fit-content",
							h: "full",
							display: "flex",
							alignItems: "center",
						})}
						style={{ transform: `translateX(${offsetX}px)` }}
					>
						{Array.from({ length: TICK_COUNT }, (_, i) => (
							<span
								key={i}
								style={{
									height: i === centerTickIndex ? "100%" : "calc(100% - 9px)",
								}}
								className={css({
									marginRight: `${TICK_GAP}px`,
									marginLeft: `${TICK_GAP}px`,
									w: `${TICK_WIDTH}px`,
									background: "lamp",
									display: "block",
									borderRadius: "full",
								})}
							></span>
						))}
					</div>
				</div>

				{/* プラスボタン */}
				<button
					onClick={increase}
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
					{bpm}
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
