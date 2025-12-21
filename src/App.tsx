import { useEffect, useReducer, useState } from "react";
import { css } from "../styled-system/css";
import { useMetronome } from "./hooks/useMetronome";

// --- データ型定義 ---
type Beat = {
	id: string;
	divisions: number; // この拍の分割数（リズムパターン）
	color: string;
};

// プレイバック位置の状態
type PlaybackPosition = {
	beatIndex: number;
	segmentIndex: number;
};

type PlaybackAction =
	| { type: "NEXT_SEGMENT"; beats: Beat[] }
	| { type: "RESET" };

// プレイバック位置を管理するreducer
const playbackReducer = (
	state: PlaybackPosition,
	action: PlaybackAction
): PlaybackPosition => {
	switch (action.type) {
		case "NEXT_SEGMENT": {
			const currentBeat = action.beats[state.beatIndex];
			if (!currentBeat) return { beatIndex: 0, segmentIndex: -1 };

			const nextSegment = state.segmentIndex + 1;

			// 現在の拍の全セグメントが鳴り終わったら次の拍へ
			if (nextSegment >= currentBeat.divisions) {
				const nextBeat = state.beatIndex + 1;
				// 全ての拍が鳴り終わったら最初の拍に戻り、そのクリックで最初のセグメント(0)を即座に鳴らす
				if (nextBeat >= action.beats.length) {
					return { beatIndex: 0, segmentIndex: 0 };
				}
				// 次の拍に移り、そのクリックで最初のセグメント(0)を即座に鳴らす
				return { beatIndex: nextBeat, segmentIndex: 0 };
			}

			return { beatIndex: state.beatIndex, segmentIndex: nextSegment };
		}
		case "RESET":
			return { beatIndex: 0, segmentIndex: -1 };
		default:
			return state;
	}
};

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
	// --- 拍の管理 ---
	// 初期状態: 4拍子でスタート
	const [beats, setBeats] = useState<Beat[]>([
		{ id: "beat-1", divisions: 4, color: "#4CAF50" },
		{ id: "beat-2", divisions: 4, color: "#2196F3" },
		{ id: "beat-3", divisions: 4, color: "#FF9800" },
		{ id: "beat-4", divisions: 4, color: "#E91E63" },
	]);

	// BPM設定
	const [bpm, setBpm] = useState(120);

	// メトロノームの統合
	const { isPlaying, togglePlay, isBeat } = useMetronome(bpm);

	// プレイバック位置をreducerで管理
	// segmentIndex: -1 は「まだ何も鳴っていない」を表す
	const [playbackPosition, dispatch] = useReducer(playbackReducer, {
		beatIndex: 0,
		segmentIndex: -1,
	});

	const { beatIndex: currentBeatIndex, segmentIndex: currentSegmentIndex } =
		playbackPosition;

	// isBeatがtrueになったら次の音符（segment）に進む
	useEffect(() => {
		if (isBeat) {
			dispatch({ type: "NEXT_SEGMENT", beats });
		}
	}, [isBeat, beats]);

	// 拍の色のパレット
	const colorPalette = [
		"#4CAF50",
		"#2196F3",
		"#FF9800",
		"#E91E63",
		"#9C27B0",
		"#00BCD4",
		"#FFEB3B",
		"#795548",
	];

	// 拍子を設定（n拍子）
	const setTimeSignature = (count: number) => {
		const newBeats: Beat[] = [];
		for (let i = 0; i < count; i++) {
			newBeats.push({
				id: `beat-${i}`,
				divisions: 4, // デフォルトは4分割
				color: colorPalette[i % colorPalette.length],
			});
		}
		setBeats(newBeats);
		dispatch({ type: "RESET" }); // インデックスをリセット
	};

	// 拍を追加
	const addBeat = () => {
		const newId = `beat-${Date.now()}`;
		const newColor = colorPalette[beats.length % colorPalette.length];
		setBeats([...beats, { id: newId, divisions: 4, color: newColor }]);
	};

	// 拍を削除
	const removeBeat = () => {
		if (beats.length > 1) {
			setBeats(beats.slice(0, -1));
		}
	};

	// 特定の拍の分割数を変更
	const updateDivisions = (beatId: string, delta: number) => {
		setBeats(
			beats.map((beat) => {
				if (beat.id === beatId) {
					return {
						...beat,
						divisions: Math.max(1, beat.divisions + delta),
					};
				}
				return beat;
			})
		);
	};

	// --- 設定 ---
	const size = 200;
	const center = size / 2;
	const outerRadius = 80;
	const innerRadius = 40;
	const baseGap = 11; // 隙間（角度）

	// ★ここで角丸の強さを調整！
	const cornerRadius = 4;

	// ★枠線の設定を追加
	const borderColor = "red"; // 枠線の色（例: 白）
	const borderSize = 1; // 枠線の太さ

	// --- 描画データの生成 ---
	// 各拍ごとにセグメントを生成する関数
	const createSegments = (divisions: number, color: string) => {
		const isSingle = divisions === 1;
		const currentGap = isSingle ? 0 : baseGap;
		const totalAngle = 360;
		const anglePerSegment = totalAngle / divisions;
		const arcLength = isSingle
			? 359.99
			: Math.max(0, anglePerSegment - currentGap);

		return Array.from({ length: divisions }, (_, i) => {
			const startAngle = i * anglePerSegment;
			const endAngle = startAngle + arcLength;
			return {
				startAngle,
				endAngle,
				color,
			};
		});
	};

	return (
		<>
			<div>
				<span>playGround - Polyrhythmic Metronome</span>

				{/* 各拍ごとに円を描画 */}
				{beats.map((beat, beatIndex) => {
					const segments = createSegments(beat.divisions, beat.color);

					return (
						<div key={beat.id}>
							<svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
								{/* 外側の枠線 */}
								<circle
									cx={center}
									cy={center}
									r={outerRadius + cornerRadius + 4}
									fill="none"
									stroke={beat.color}
									strokeWidth="1"
								/>

								{segments.map((seg, segmentIndex) => {
									const pathData = describeArc(
										center,
										center,
										innerRadius,
										outerRadius,
										seg.startAngle,
										seg.endAngle
									);

									// この音符が既に鳴ったかどうかを判定
									let isActivated = false;
									if (beatIndex < currentBeatIndex) {
										// 過去の拍は全て鳴った
										isActivated = true;
									} else if (beatIndex === currentBeatIndex) {
										// 現在の拍では、現在のセグメント「も含めて」塗りつぶす
										isActivated = segmentIndex <= currentSegmentIndex;
									}

									return (
										<g key={segmentIndex}>
											{/* --- 1. 下レイヤー：本体（塗りつぶし＋角丸用の太い線） --- */}
											<path
												d={pathData}
												fill={isActivated ? seg.color : "none"}
												stroke={seg.color}
												strokeWidth={cornerRadius * 2}
												strokeLinejoin="round"
											/>

											{/* --- 2. 上レイヤー：枠線（中身は透明） --- */}
											<path
												d={pathData}
												fill="none"
												stroke={borderColor}
												strokeWidth={borderSize}
												strokeLinejoin="round"
											/>
										</g>
									);
								})}
							</svg>

							{/* 各拍の分割数コントロール */}
							<div
								className={css({
									display: "flex",
									gap: 2,
									alignItems: "center",
									marginTop: 2,
								})}
							>
								<span>拍{beatIndex + 1}:</span>
								<button
									onClick={() => updateDivisions(beat.id, -1)}
									disabled={beat.divisions <= 1}
									className={css({
										px: 2,
										py: 1,
										cursor: "pointer",
										opacity: beat.divisions <= 1 ? 0.5 : 1,
									})}
								>
									-
								</button>
								<span>{beat.divisions}分割</span>
								<button
									onClick={() => updateDivisions(beat.id, 1)}
									className={css({
										px: 2,
										py: 1,
										cursor: "pointer",
									})}
								>
									+
								</button>
							</div>
						</div>
					);
				})}

				<div
					className={css({
						display: "grid",
						gap: 8,
						marginTop: 4,
					})}
				>
					{/* メトロノームコントロール */}
					<div>
						<h3>メトロノーム</h3>
						<div
							className={css({
								display: "flex",
								gap: 4,
								alignItems: "center",
							})}
						>
							<button
								onClick={togglePlay}
								className={css({
									px: 6,
									py: 2,
									cursor: "pointer",
									background: isPlaying ? "orange" : "green",
								})}
							>
								{isPlaying ? "停止" : "再生"}
							</button>
							<span>BPM:</span>
							<button
								onClick={() => setBpm((b) => Math.max(40, b - 10))}
								className={css({
									px: 2,
									py: 1,
									cursor: "pointer",
								})}
							>
								-
							</button>
							<span>{bpm}</span>
							<button
								onClick={() => setBpm((b) => Math.min(300, b + 10))}
								className={css({
									px: 2,
									py: 1,
									cursor: "pointer",
								})}
							>
								+
							</button>
						</div>
					</div>

					{/* 拍子設定 */}
					<div>
						<h3>拍子設定</h3>
						<div
							className={css({
								display: "flex",
								gap: 4,
								flexWrap: "wrap",
							})}
						>
							{[2, 3, 4, 5, 6, 7, 8].map((count) => (
								<button
									key={count}
									onClick={() => setTimeSignature(count)}
									className={css({
										px: 4,
										py: 2,
										cursor: "pointer",
										background: beats.length === count ? "purple" : "gray",
										color: "white",
									})}
								>
									{count}拍子
								</button>
							))}
						</div>
					</div>

					{/* 拍数コントロール */}
					<div>
						<h3>拍数: {beats.length}</h3>
						<div
							className={css({
								display: "flex",
								gap: 4,
							})}
						>
							<button
								onClick={removeBeat}
								disabled={beats.length <= 1}
								className={css({
									display: "block",
									background: "blue",
									px: 6,
									py: 2,
									cursor: "pointer",
									opacity: beats.length <= 1 ? 0.5 : 1,
								})}
							>
								拍を削除 (-)
							</button>
							<button
								onClick={addBeat}
								className={css({
									display: "block",
									background: "red",
									px: 6,
									py: 2,
									cursor: "pointer",
								})}
							>
								拍を追加 (+)
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default App;
