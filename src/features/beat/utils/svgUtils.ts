// --- 数学ヘルパー関数: 角度と半径から座標を求める ---
const polarToCartesian = (
	centerX: number,
	centerY: number,
	radius: number,
	angleInDegrees: number
) => {
	// SVGの角度は3時方向が0度なので、-90度して12時方向を0度にする
	const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
	return {
		x: centerX + radius * Math.cos(angleInRadians),
		y: centerY + radius * Math.sin(angleInRadians),
	};
};

// --- 扇形のパスデータ(d)を生成する関数 ---
const describeArc = (
	x: number,
	y: number,
	innerRadius: number,
	outerRadius: number,
	startAngle: number,
	endAngle: number
) => {
	const start = polarToCartesian(x, y, outerRadius, endAngle);
	const end = polarToCartesian(x, y, outerRadius, startAngle);
	const start2 = polarToCartesian(x, y, innerRadius, endAngle);
	const end2 = polarToCartesian(x, y, innerRadius, startAngle);

	// 180度を超える円弧の場合のフラグ
	const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

	// パスを描画する命令文を作成
	const d = [
		"M",
		start.x,
		start.y,
		"A",
		outerRadius,
		outerRadius,
		0,
		largeArcFlag,
		0,
		end.x,
		end.y,
		"L",
		end2.x,
		end2.y,
		"A",
		innerRadius,
		innerRadius,
		0,
		largeArcFlag,
		1,
		start2.x,
		start2.y,
		"Z", // パスを閉じる
	].join(" ");

	return d;
};

export { polarToCartesian, describeArc };
