import { useState } from "react";
import { useMetronome } from "./hooks/useMetronome";
import { css } from "../styled-system/css";

function App() {
	const [bpm, setBpm] = useState(120);
	const { isPlaying, togglePlay, isBeat } = useMetronome(bpm);

	return (
		<>
			<div
				className={css({
					w: "full",
					h: "100vh",
					backgroundColor: isBeat ? "#232323" : "#222222",
				})}
			>
				<div>
					<h1>メトロノームアプリ試作</h1>
				</div>

				<div>
					<label htmlFor="">BPM: {bpm}</label>
					<input
						type="range"
						min="40"
						max="240"
						value={bpm}
						onChange={(e) => setBpm(Number(e.target.value))}
					/>
				</div>

				<button onClick={togglePlay}>{isPlaying ? "STOP" : "START"}</button>
			</div>
		</>
	);
}
export default App;
