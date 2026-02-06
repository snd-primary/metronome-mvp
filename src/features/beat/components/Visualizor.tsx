import { useEffect, useReducer, useState } from "react";
import { css } from "../../../../styled-system/css";
import { useMetronome } from "../../metronome/hooks/useMetronome";
import type { Beat } from "../types";
import { playbackReducer } from "../reducers/playBackReducer";
import { BeatCircle } from "./BeatCircle";
import { TimeSignatureSelector } from "./TimeSignatureSelector";
import DivisionControl from "./DivisionControl";
import { TouchPad } from "./TouchPad";
import { VolumeSlider } from "../../metronome/components/VolumeSlider";
import { BpmSlider } from "../../metronome/components/BpmSlider";
import { PlayButton } from "../../metronome/components/PlayButton";
import { BpmDisplay } from "../../metronome/components/BpmDisplay";

export const Visualizor = () => {
	// --- 拍の管理 ---
	const [beats, setBeats] = useState<Beat[]>([
		{ id: "beat-1", divisions: 4 },
		{ id: "beat-2", divisions: 4 },
		{ id: "beat-3", divisions: 4 },
		{ id: "beat-4", divisions: 4 },
	]);

	const [bpm] = useState(120);
	const { isBeat } = useMetronome(bpm);

	const [playbackPosition, dispatch] = useReducer(playbackReducer, {
		beatIndex: 0,
		segmentIndex: -1,
	});

	const { beatIndex: currentBeatIndex, segmentIndex: currentSegmentIndex } =
		playbackPosition;

	useEffect(() => {
		if (isBeat) {
			dispatch({ type: "NEXT_SEGMENT", beats });
		}
	}, [isBeat, beats]);

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
		<div
			className={css({
				display: "grid",
				gridTemplateRows:
					"auto auto auto 1fr auto auto",
				gap: 4,
				h: "full",
				maxW: "400px",
				w: "full",
				justifySelf: "center",
			})}
		>
			{/* Row 1: BPM Display */}
			<BpmDisplay />

			{/* Row 2: Beat Circles */}
			<div
				className={css({
					display: "grid",
					gridTemplateColumns: "repeat(4, 1fr)",
					justifyItems: "center",
					w: "full",
				})}
			>
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

			{/* Row 3: Selectors (4/4 | ♪) */}
			<div
				className={css({
					display: "grid",
					gridTemplateColumns: "auto auto auto",
					justifyContent: "center",
					alignItems: "center",
					gap: 4,
					color: "lamp",
				})}
			>
				<TimeSignatureSelector />
				<span
					className={css({
						fontSize: "3xl",
						color: "lamp-dim",
					})}
				>
					|
				</span>
				<DivisionControl />
			</div>

			{/* Row 4: TouchPad + VolumeSlider */}
			<div
				className={css({
					display: "grid",
					gridTemplateColumns: "1fr auto",
					gap: 3,
					alignItems: "stretch",
				})}
			>
				<TouchPad />
				<VolumeSlider />
			</div>

			{/* Row 5: BPM Slider */}
			<BpmSlider />

			{/* Row 6: Play Button */}
			<PlayButton />
		</div>
	);
};
