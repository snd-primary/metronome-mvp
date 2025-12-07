import { css } from "../styled-system/css";

function App() {
	return (
		<div
			className={css({
				display: "grid",
				gridTemplateColumns: "1fr",
				alignSelf: "start",
			})}
		>
			{/* DataView: BPM Value */}
			<div
				className={css({
					display: "grid",
					w: "full",
					h: "full",
					placeContent: "center",
					placeItems: "center",
				})}
			>
				<output
					className={css({
						fontFamily: "orbitron",
						display: "flex",
						justifyContent: "center",
						alignItems: "baseline",
						gap: 4,
					})}
				>
					<span
						className={css({
							fontSize: "8xl",
							fontWeight: "600",
						})}
					>
						123
					</span>
					<span
						className={css({
							fontSize: "3xl",
						})}
					>
						BPM
					</span>
				</output>
			</div>
		</div>
	);
}
export default App;

// {/* DataView: BPM Value */}
// {/* Visual: Beat Indicator */}
// {/* Controler: Beat&Rhythm Selector */}
// {/* Controler: Touch Pad */}
// {/* Controler: Volume slider */}
// {/* Controler: BPM Slider */}
// {/* Controler: TogglePlay Button */}
