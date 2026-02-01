import { css } from "../../../../styled-system/css";
import { token } from "../../../../styled-system/tokens";
import type { Beat } from "../types";
import { describeArc } from "../utils/svgUtils";

type Props = {
	beat: Beat;
	beatIndex: number;
	currentBeatIndex: number;
	currentSegmentIndex: number;
	updateDivisions: (beatId: string, delta: number) => void;
};

// --- 描画設定 ---
const size = 200;
const center = size / 2;
const outerRadius = 80;
const innerRadius = 40;
const baseGap = 11;
const cornerRadius = 4;
const borderSize = 1;
const color = token("colors.foreground");

const createSegments = (divisions: number) => {
	const isSingle = divisions === 1;
	const currentGap = isSingle ? 0 : baseGap;
	const totalAngle = 360;
	const anglePerSegment = totalAngle / divisions;
	const arcLength = isSingle
		? 359.99
		: Math.max(0, anglePerSegment - currentGap);

	return Array.from({ length: divisions }, (_, i) => {
		const startAngle = i * anglePerSegment;
		const endAngle = startAngle + arcLength;
		return {
			startAngle,
			endAngle,
		};
	});
};

export const BeatCircle = ({
	beat,
	beatIndex,
	currentBeatIndex,
	currentSegmentIndex,
	updateDivisions,
}: Props) => {
	const segments = createSegments(beat.divisions);

	return (
		<svg
			viewBox={`0 0 ${size} ${size}`}
			className={css({
				w: "full",
				h: "full",
			})}
		>
			{/* 外側の枠線 */}
			<circle
				cx={center}
				cy={center}
				r={outerRadius + cornerRadius + 4}
				fill="none"
				stroke={color}
				strokeWidth="1"
			/>

			{segments.map((seg, segmentIndex) => {
				const pathData = describeArc(
					center,
					center,
					innerRadius,
					outerRadius,
					seg.startAngle,
					seg.endAngle,
				);

				// この音符が既に鳴ったかどうかを判定
				let isActivated = false;
				if (beatIndex < currentBeatIndex) {
					// 過去の拍は全て鳴った
					isActivated = true;
				} else if (beatIndex === currentBeatIndex) {
					// 現在の拍では、現在のセグメント「も含めて」塗りつぶす
					isActivated = segmentIndex <= currentSegmentIndex;
				}

				return (
					<g key={segmentIndex}>
						{/* --- 1. 下レイヤー：本体（塗りつぶし＋角丸用の太い線） --- */}
						<path
							d={pathData}
							fill={isActivated ? color : "none"}
							stroke={color}
							strokeWidth={cornerRadius * 2}
							strokeLinejoin="round"
						/>

						{/* --- 2. 上レイヤー：枠線（中身は透明） --- */}
						<path
							d={pathData}
							fill="none"
							stroke={color}
							strokeWidth={borderSize}
							strokeLinejoin="round"
						/>
					</g>
				);
			})}
		</svg>
	);
};
