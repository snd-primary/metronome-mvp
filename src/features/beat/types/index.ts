// --- データ型定義 ---
export type Beat = {
	id: string;
	divisions: number; // この拍の分割数（リズムパターン）
	color: string;
};

// プレイバック位置の状態
export type PlaybackPosition = {
	beatIndex: number;
	segmentIndex: number;
};

export type PlaybackAction =
	| { type: "NEXT_SEGMENT"; beats: Beat[] }
	| { type: "RESET" };
