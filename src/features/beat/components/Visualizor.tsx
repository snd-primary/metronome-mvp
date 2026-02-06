import { useEffect, useReducer, useState } from "react";
import { css } from "../../../../styled-system/css";
import { useMetronome } from "../../metronome/hooks/useMetronome";
import type { Beat } from "../types";
import { playbackReducer } from "../reducers/playBackReducer";
import { BeatCircle } from "./BeatCircle";
import { TimeSignatureSelector } from "./TimeSignatureSelector";
import DivisionControl from "./DivisionControl";

export const Visualizor = () => {
	// --- 拍の管理 ---
	// 初期状態: 4拍子でスタート
	const [beats, setBeats] = useState<Beat[]>([
		{ id: "beat-1", divisions: 4 },
		{ id: "beat-2", divisions: 4 },
		{ id: "beat-3", divisions: 4 },
		{ id: "beat-4", divisions: 4 },
	]);

	// BPM設定
	const [bpm, setBpm] = useState(120);

	// メトロノームの統合
	const { isBeat } = useMetronome(bpm);

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

	// 拍子を設定（n拍子）
	/* 	const setTimeSignature = (count: number) => {
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
	}; */

	// 拍を追加
	/* 	const addBeat = () => {
		const newId = `beat-${Date.now()}`;
		const newColor = colorPalette[beats.length % colorPalette.length];
		setBeats([...beats, { id: newId, divisions: 4, color: newColor }]);
	}; */

	// 拍を削除
	/* 	const removeBeat = () => {
		if (beats.length > 1) {
			setBeats(beats.slice(0, -1));
		}
	}; */

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
			}),
		);
	};

	return (
		<div>
			<div
				className={css({
					display: "grid",
					gridTemplateColumns: "repeat(4, 80px)",
					alignContent: "start",
					justifyContent: "center",
					w: "full",
					h: "full",
				})}
			>
				{/* 各拍ごとに円を描画 */}
				{beats.map((beat, beatIndex) => (
					<BeatCircle
						key={beat.id}
						beat={beat}
						beatIndex={beatIndex}
						currentBeatIndex={currentBeatIndex}
						currentSegmentIndex={currentSegmentIndex}
						updateDivisions={updateDivisions}
					/>
				))}
			</div>

			{/* basic controls */}
			<div
				className={css({
					w: "full",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					gap: 6,
				})}
			>
				<TimeSignatureSelector />
				<span
					className={css({
						fontSize: "4xl",
					})}
				>
					|
				</span>
				<DivisionControl />
			</div>

			<div></div>
		</div>
	);
};
