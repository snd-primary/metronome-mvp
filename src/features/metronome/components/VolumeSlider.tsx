import { useState } from "react";
import { css } from "../../../../styled-system/css";

const TRACK_HEIGHT = 200;
const TRACK_WIDTH = 28;
const BORDER_RADIUS = 14;

const ACCENT_COLOR = "oklch(0.75 0.12 110)";
const TRACK_BG = "oklch(0.18 0 0)";
const TRACK_BORDER = "oklch(0.3 0 0)";

export const VolumeSlider = () => {
	const [value, setValue] = useState(0.65);

	const fillHeight = value * TRACK_HEIGHT;

	const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		e.currentTarget.setPointerCapture(e.pointerId);
		updateValue(e);
	};

	const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (e.buttons === 0) return;
		updateValue(e);
	};

	const updateValue = (e: React.PointerEvent<HTMLDivElement>) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const y = e.clientY - rect.top;
		const clamped = Math.max(0, Math.min(1, 1 - y / rect.height));
		setValue(clamped);
	};

	return (
		<div
			className={css({
				display: "grid",
				justifyItems: "center",
				alignContent: "end",
				gap: 2,
			})}
		>
			{/* スライダートラック */}
			<div
				onPointerDown={handlePointerDown}
				onPointerMove={handlePointerMove}
				className={css({
					position: "relative",
					cursor: "pointer",
					touchAction: "none",
				})}
				style={{
					width: TRACK_WIDTH,
					height: TRACK_HEIGHT,
					borderRadius: BORDER_RADIUS,
					background: TRACK_BG,
					border: `1px solid ${TRACK_BORDER}`,
					overflow: "hidden",
				}}
			>
				{/* 塗りつぶし部分（下から上へ） */}
				<div
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						right: 0,
						height: fillHeight,
						background: ACCENT_COLOR,
						transition: "height 0.05s ease-out",
					}}
				/>

				{/* ノイズテクスチャ */}
				<svg
					style={{
						position: "absolute",
						bottom: 0,
						left: 0,
						width: "100%",
						height: fillHeight,
						pointerEvents: "none",
					}}
				>
					<defs>
						<filter id="vol-noise">
							<feTurbulence
								type="fractalNoise"
								baseFrequency="1.2"
								numOctaves="4"
								seed="3"
							/>
							<feColorMatrix type="saturate" values="0" />
							<feBlend in="SourceGraphic" mode="multiply" />
						</filter>
					</defs>
					<rect
						width="100%"
						height="100%"
						fill={ACCENT_COLOR}
						filter="url(#vol-noise)"
						opacity="0.35"
					/>
				</svg>
			</div>

			{/* スピーカーアイコン */}
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke={ACCENT_COLOR}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill={ACCENT_COLOR} />
				<path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
				<path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
			</svg>
		</div>
	);
};
