import { css } from "../../../../styled-system/css";
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

// アクセントカラー（黄緑ランプ色）
const LAMP_COLOR = "oklch(0.75 0.12 110)";
const LAMP_DIM = "oklch(0.35 0.06 110)";

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
}: Props) => {
	const segments = createSegments(beat.divisions);
	const filterId = `grain-${beat.id}`;

	return (
		<svg
			viewBox={`0 0 ${size} ${size}`}
			className={css({
				w: "full",
				h: "full",
			})}
		>
			<defs>
				<filter id={filterId}>
					<feTurbulence
						type="fractalNoise"
						baseFrequency="1.5"
						numOctaves="4"
						seed={beatIndex + 1}
					/>
					<feColorMatrix type="saturate" values="0" />
					<feBlend in="SourceGraphic" mode="multiply" />
				</filter>
			</defs>

			{/* 外側の枠線 */}
			<circle
				cx={center}
				cy={center}
				r={outerRadius + cornerRadius + 4}
				fill="none"
				stroke={LAMP_DIM}
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
					isActivated = true;
				} else if (beatIndex === currentBeatIndex) {
					isActivated = segmentIndex <= currentSegmentIndex;
				}

				return (
					<g key={segmentIndex}>
						{/* 1. 本体（塗りつぶし＋角丸） */}
						<path
							d={pathData}
							fill={isActivated ? LAMP_COLOR : "none"}
							stroke={isActivated ? LAMP_COLOR : LAMP_DIM}
							strokeWidth={cornerRadius * 2}
							strokeLinejoin="round"
						/>

						{/* 2. グレインテクスチャ（アクティブ時のみ） */}
						{isActivated && (
							<path
								d={pathData}
								fill={LAMP_COLOR}
								stroke="none"
								strokeWidth={cornerRadius * 2}
								strokeLinejoin="round"
								filter={`url(#${filterId})`}
								opacity="0.3"
							/>
						)}

						{/* 3. 枠線 */}
						<path
							d={pathData}
							fill="none"
							stroke={isActivated ? LAMP_COLOR : LAMP_DIM}
							strokeWidth={borderSize}
							strokeLinejoin="round"
						/>
					</g>
				);
			})}
		</svg>
	);
};
