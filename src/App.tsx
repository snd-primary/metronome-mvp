import { useState } from "react";
import { css } from "../styled-system/css";

// --- 数学ヘルパー関数: 角度と半径から座標を求める ---
const polarToCartesian = (
	centerX: number,
	centerY: number,
	radius: number,
	angleInDegrees: number
) => {
	// SVGの角度は3時方向が0度なので、-90度して12時方向を0度にする
	const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians),
	};
};

// --- 扇形のパスデータ(d)を生成する関数 ---
const describeArc = (
	x: number,
	y: number,
	innerRadius: number,
	outerRadius: number,
	startAngle: number,
	endAngle: number
) => {
	const start = polarToCartesian(x, y, outerRadius, endAngle);
	const end = polarToCartesian(x, y, outerRadius, startAngle);
	const start2 = polarToCartesian(x, y, innerRadius, endAngle);
	const end2 = polarToCartesian(x, y, innerRadius, startAngle);

	// 180度を超える円弧の場合のフラグ
	const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

	// パスを描画する命令文を作成
	const d = [
		"M",
		start.x,
		start.y,
		"A",
		outerRadius,
		outerRadius,
		0,
		largeArcFlag,
		0,
		end.x,
		end.y,
		"L",
		end2.x,
		end2.y,
		"A",
		innerRadius,
		innerRadius,
		0,
		largeArcFlag,
		1,
		start2.x,
		start2.y,
		"Z", // パスを閉じる
	].join(" ");

	return d;
};

const App = () => {
	const [count, setCount] = useState(5);

	// --- 設定 ---
	const size = 200;
	const center = size / 2;
	const outerRadius = 80;
	const innerRadius = 45;
	const baseGap = 11; // 隙間（角度）

	// ★ここで角丸の強さを調整！
	const cornerRadius = 4;

	// --- ★変更点: currentGapのロジック ---
	const isSingle = count === 1;
	const currentGap = isSingle ? 0 : baseGap;

	// --- 描画データの生成 ---
	// 1つの扇形が占める角度（隙間分を引く）
	const totalAngle = 360;
	const anglePerSegment = totalAngle / count;
	// const arcAngle = Math.max(0, anglePerSegment - currentGap);
	const arcLength = isSingle
		? 359.99
		: Math.max(0, anglePerSegment - currentGap);

	// 配列を生成してmapで回す
	const segments = Array.from({ length: count }, (_, i) => {
		const startAngle = i * anglePerSegment;
		const endAngle = startAngle + arcLength;
		return {
			startAngle,
			endAngle,
			color: "#4CAF50",
		};
	});

	return (
		<>
			<div>
				<span>playGround</span>
				<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
					{/* 外側の枠線 */}
					<circle
						cx={center}
						cy={center}
						r={outerRadius + cornerRadius + 4}
						fill="none"
						stroke="#4CAF50"
						strokeWidth="1"
					/>

					{segments.map((seg, i) => (
						<path
							key={i}
							d={describeArc(
								center,
								center,
								innerRadius,
								outerRadius,
								seg.startAngle,
								seg.endAngle
							)}
							fill={seg.color}
							stroke={seg.color}
							strokeWidth={cornerRadius * 2}
							strokeLinejoin="round"
						/>
					))}
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
};
export default App;
