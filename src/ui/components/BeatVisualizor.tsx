import { css } from "../../../styled-system/css";

type BeatVisualizorProps = {
	beatCount?: number;
	segments?: number;
	innerRadiusRatio?: number;
};

export const BeatVisualizor = ({
	beatCount = 4,
	segments = 8,
	innerRadiusRatio = 0.5,
}: BeatVisualizorProps) => {
	const circleRadius = 40;
	const strokeWidth = 3;
	const circleSpacing = 20;
	const padding = strokeWidth;
	const totalWidth =
		beatCount * (circleRadius * 2) + (beatCount - 1) * circleSpacing + padding * 2;
	const svgHeight = circleRadius * 2 + padding * 2;

	const createSegmentPath = (
		cx: number,
		cy: number,
		outerRadius: number,
		innerRadius: number,
		startAngle: number,
		endAngle: number,
	) => {
		const toRadians = (angle: number) => (angle * Math.PI) / 180;
		const x1 = cx + outerRadius * Math.cos(toRadians(startAngle));
		const y1 = cy + outerRadius * Math.sin(toRadians(startAngle));
		const x2 = cx + outerRadius * Math.cos(toRadians(endAngle));
		const y2 = cy + outerRadius * Math.sin(toRadians(endAngle));
		const x3 = cx + innerRadius * Math.cos(toRadians(endAngle));
		const y3 = cy + innerRadius * Math.sin(toRadians(endAngle));
		const x4 = cx + innerRadius * Math.cos(toRadians(startAngle));
		const y4 = cy + innerRadius * Math.sin(toRadians(startAngle));

		const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

		return `
			M ${x1} ${y1}
			A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${x2} ${y2}
			L ${x3} ${y3}
			A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}
			Z
		`;
	};

	return (
		<div
			className={css({
				display: "grid",
				w: "full",
				h: "full",
				placeItems: "center",
			})}
		>
			<svg
				width="100%"
				height="100%"
				viewBox={`0 0 ${totalWidth} ${svgHeight}`}
				preserveAspectRatio="xMidYMid meet"
				className={css({
					maxWidth: "full",
					maxHeight: "full",
				})}
			>
				<defs>
					<filter id="perlin-noise">
						<feTurbulence
							type="fractalNoise"
							baseFrequency="2.5"
							numOctaves="3"
							seed="2"
						/>
						<feColorMatrix type="saturate" values="0" />
						<feComponentTransfer>
							<feFuncA type="discrete" tableValues="0 1" />
						</feComponentTransfer>
						<feComposite operator="in" in2="SourceGraphic" />
						<feBlend mode="multiply" in2="SourceGraphic" />
					</filter>
				</defs>

				{Array.from({ length: beatCount }).map((_, beatIndex) => {
					const cx = circleRadius + padding + beatIndex * (circleRadius * 2 + circleSpacing);
					const cy = circleRadius + padding;
					const innerRadius = circleRadius * innerRadiusRatio;
					const segmentAngle = 360 / segments;
					const gapAngle = 4;

					return (
						<g key={beatIndex}>
							{Array.from({ length: segments }).map((_, segmentIndex) => {
								const startAngle = segmentIndex * segmentAngle - 90;
								const endAngle = (segmentIndex + 1) * segmentAngle - gapAngle - 90;
								const pathData = createSegmentPath(
									cx,
									cy,
									circleRadius,
									innerRadius,
									startAngle,
									endAngle,
								);

								return (
									<path
										key={segmentIndex}
										d={pathData}
										fill="currentColor"
										filter="url(#perlin-noise)"
										stroke="#ff0000"
										strokeWidth={strokeWidth}
									/>
								);
							})}
						</g>
					);
				})}
			</svg>
		</div>
	);
};
