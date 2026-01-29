import { css } from "../../../../styled-system/css";

type Props = {
	isPlaying: boolean;
	bpm: number;
	togglePlay: () => void;
	setBpm: (updater: (prev: number) => number) => void;
};

export const MetronomeControl = ({
	isPlaying,
	bpm,
	togglePlay,
	setBpm,
}: Props) => {
	return (
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
	);
};
