import type { PlaybackAction, PlaybackPosition } from "../types";

// プレイバック位置を管理するreducer
export const playbackReducer = (
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
