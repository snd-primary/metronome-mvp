import { useState } from "react";
import { css } from "../styled-system/css";

function App() {
	const [count, setCount] = useState<number>(5);

	//設定値
	const CONFIG = {
		RADIUS: 15.9155, //メインの半径
		STROKE_WIDTH: 12, //メインの太さ
		GAP: 1, //隙間
		PADDING: 1, //ドーナツと外枠の隙間
		BORDERTHICKNESS: 0.5, //外枠の太さ
		CIRCUMFERENCE: 100, //外周
	};

	const maxRadius =
		CONFIG.RADIUS +
		CONFIG.STROKE_WIDTH / 2 +
		CONFIG.PADDING +
		CONFIG.BORDERTHICKNESS;

	const size = maxRadius * 2;
	const center = size / 2;

	const currentGap = count === 1 ? 0 : CONFIG.GAP;

	const outerRadius =
		CONFIG.RADIUS +
		CONFIG.STROKE_WIDTH / 2 +
		CONFIG.PADDING +
		CONFIG.BORDERTHICKNESS / 2;

	const availableLength = CONFIG.CIRCUMFERENCE - CONFIG.GAP * count;
	const segmentLength = Math.max(0, availableLength / count);
	const dashArray = `${segmentLength} ${currentGap}`;

	return (
		<>
			<div>
				<span>playGround</span>
				<svg width="250" height="250" viewBox={`0 0 ${size} ${size}`}>
					{/* 背景のトラック */}
					<circle cx="20" cy="20" r={CONFIG.RADIUS} />

					{/* メインの分割ドーナツ */}
					<circle
						cx={center}
						cy={center}
						r={CONFIG.RADIUS}
						fill="none"
						stroke="#4CAF50"
						strokeWidth={CONFIG.STROKE_WIDTH}
						strokeDasharray={dashArray}
						strokeDashoffset="25"
					/>

					{/* 外側の枠線 */}
					<circle
						cx={center}
						cy={center}
						r={outerRadius}
						fill="none"
						stroke="#4CAF50"
						stroke-width={CONFIG.BORDERTHICKNESS}
					/>
				</svg>

				<div
					className={css({
						display: "grid",
						gap: 8,
					})}
				>
					<dl
						className={css({
							display: "flex",
							gap: 2,
						})}
					>
						<dt>分割数:</dt>
						<dd>{count}</dd>
					</dl>
					<div
						className={css({
							display: "flex",
							gap: 4,
						})}
					>
						<button
							onClick={() => setCount((c) => Math.max(1, c - 1))}
							className={css({
								display: "block",
								background: "blue",
								px: 6,
								py: 0,
								outlineColor: "blue.100",
							})}
						>
							-
						</button>
						<button
							onClick={() => setCount((c) => Math.max(1, c + 1))}
							className={css({
								display: "block",
								background: "red",
								px: 6,
								py: 0,
								outlineColor: "rose.100",
							})}
						>
							+
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
export default App;
