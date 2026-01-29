import { css } from "../../../../styled-system/css";

type Props = {
	currentBeatCount: number;
	setTimeSignature: (count: number) => void;
};

export const TimeSignatureControl = ({
	currentBeatCount,
	setTimeSignature,
}: Props) => {
	return (
		<div>
			<h3>拍子設定</h3>
			<div
				className={css({
					display: "flex",
					gap: 4,
					flexWrap: "wrap",
				})}
			>
				{[2, 3, 4, 5, 6, 7, 8].map((count) => (
					<button
						key={count}
						onClick={() => setTimeSignature(count)}
						className={css({
							px: 4,
							py: 2,
							cursor: "pointer",
							background: currentBeatCount === count ? "purple" : "gray",
							color: "white",
						})}
					>
						{count}拍子
					</button>
				))}
			</div>
		</div>
	);
};
