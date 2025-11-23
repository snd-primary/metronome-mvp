import { useCallback, useEffect, useRef, useState } from "react";

export const useMetronome = (bpm: number) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [isBeat, setIsBeat] = useState(false);

	// Web Audio APIのコンテキスト
	// レンダリング間で保持するために useRefを使う
	const audioContextUiRef = useRef<AudioContext | null>(null);

	// 「次に音が鳴る予定の時間」を記録する変数
	const nextNoteTimeRef = useRef<number>(0);

	// スケジューリングのタイマーID
	const timerIdRef = useRef<number | null>(null);

	// いつ音が鳴るかの予定を入れておくキュー（待ち行列）
	const notesInQueueRef = useRef<{ noteTime: number }[]>([]);

	// 描画ループのID（停止時にキャンセルするため）
	const requestRef = useRef<number | null>(null);

	// 常に最新のbpmの値を参照する
	const bpmRef = useRef(bpm);

	useEffect(() => {
		bpmRef.current = bpm;
	}, [bpm]);

	//先読みする範囲（秒）. ここでは「0.1秒先」までをスケジュールする
	const LOOKHEAD_MS = 25.0;
	const SCHEDULE_AHERD_TIME = 0.1;

	// -------------------------------------------------------
	// 1. 音を鳴らす関数 (Oscillator = 電子音)
	// -------------------------------------------------------
	const playClick = (time: number) => {
		const ctx = audioContextUiRef.current;
		if (!ctx) return;

		// 音の発生源（オシレーター）を作成
		const osc = ctx.createOscillator();
		// 音の出口（ゲイン）を作成
		const gainNode = ctx.createGain();

		osc.connect(gainNode);
		gainNode.connect(ctx.destination);

		// 音色設定（矩形波）
		osc.type = "square";
		osc.frequency.value = 1000;

		//音量エンベロープ（形）を作る
		// timeの時点で音量Maxになり、0.05秒後に無音になる
		gainNode.gain.setValueAtTime(1, time);
		gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

		//音の予約
		osc.start(time);
		osc.stop(time + 0.05);
	};

	// -------------------------------------------------------
	// 2. スケジューラー (予約係)
	// -------------------------------------------------------
	const scheduler = useCallback(() => {
		const run = () => {
			// AudioContextの参照
			const ctx = audioContextUiRef.current;
			if (!ctx) return;

			// currentTime(AudioContextが始まってから計測が開始される時間軸) + 少し先の未来(SCHEDULE_AHEAD_TIME)までの間に、次の音が鳴るべきなら予約する
			while (nextNoteTimeRef.current < ctx.currentTime + SCHEDULE_AHERD_TIME) {
				//音を予約
				const nextTime = nextNoteTimeRef.current;
				playClick(nextTime);

				// 音を予約したタイミングで、キューにもメモを入れる
				notesInQueueRef.current.push({ noteTime: nextTime });

				// 次の音の時間を計算（60秒 / BPM = 1拍の秒数）
				const currentBpm = bpmRef.current;
				const secondsPerBeat = 60.0 / currentBpm;
				nextNoteTimeRef.current += secondsPerBeat;
			}

			timerIdRef.current = window.setTimeout(run, LOOKHEAD_MS);
		};
		run();
	}, []);

	// 描画ループ関数(RAF)
	const draw = useCallback(() => {
		const run = () => {
			const ctx = audioContextUiRef.current;

			if (ctx) {
				const currentTime = ctx.currentTime;

				// キューの中を見て、現在時刻を過ぎている（鳴ったはずの）音を探す
				while (notesInQueueRef.current.length > 0) {
					const nextNote = notesInQueueRef.current[0];

					// 予定時刻が現在時刻より前なら、鳴っていることを判定
					if (nextNote.noteTime <= currentTime) {
						// 画面を光らせる
						setIsBeat(true);

						// 少し経ったら消す処理
						setTimeout(() => setIsBeat(false), 100);

						notesInQueueRef.current.shift();
					} else {
						break;
					}
				}
			}

			requestRef.current = requestAnimationFrame(run);
		};
		run();
	}, []);

	// -------------------------------------------------------
	// 3. 再生 / 停止の制御
	// -------------------------------------------------------
	const togglePlay = () => {
		if (isPlaying) {
			if (timerIdRef.current) window.clearTimeout(timerIdRef.current);
			if (requestRef.current) cancelAnimationFrame(requestRef.current);
			setIsPlaying(false);
			setIsBeat(false);
			notesInQueueRef.current = [];
		} else {
			// 再生開始処理
			// AudioContextはユーザー操作（クリック等）のタイミングで作る/再開する必要があるブラウザが多い
			if (!audioContextUiRef.current) {
				audioContextUiRef.current = new AudioContext();
			}

			//コンテキストがサスペンド状態なら再開
			if (audioContextUiRef.current.state === "suspended") {
				audioContextUiRef.current.resume();
			}

			//最初の音の時間を「現在」に設定
			nextNoteTimeRef.current = audioContextUiRef.current.currentTime;

			setIsPlaying(true);
			//スケジューラー始動

			scheduler();
			requestRef.current = requestAnimationFrame(draw);
		}
	};

	useEffect(() => {
		return () => {
			if (timerIdRef.current) window.clearTimeout(timerIdRef.current);
			if (requestRef.current) cancelAnimationFrame(requestRef.current);
			if (audioContextUiRef.current) audioContextUiRef.current.close();
		};
	}, [draw]);

	return { isPlaying, togglePlay, isBeat };
};
