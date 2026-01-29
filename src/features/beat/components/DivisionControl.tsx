import { css } from "../../../../styled-system/css";
import type { Beat } from "../types";

type Props = {
	beatIndex: number;
	beat: Beat;
	updateDivisions: (beatId: string, delta: number) => void;
};

const DivisionControl = ({ beatIndex, beat, updateDivisions }: Props) => {
	return (
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
	);
};

export default DivisionControl;
