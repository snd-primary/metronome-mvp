import { css } from "../../../../styled-system/css";

type Props = {
	beatCount: number;
	addBeat: () => void;
	removeBeat: () => void;
};

export const BeatCountControl = ({
	beatCount,
	addBeat,
	removeBeat,
}: Props) => {
	return (
		<div>
			<h3>拍数: {beatCount}</h3>
			<div
				className={css({
					display: "flex",
					gap: 4,
				})}
			>
				<button
					onClick={removeBeat}
					disabled={beatCount <= 1}
					className={css({
						display: "block",
						background: "blue",
						px: 6,
						py: 2,
						cursor: "pointer",
						opacity: beatCount <= 1 ? 0.5 : 1,
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
	);
};
