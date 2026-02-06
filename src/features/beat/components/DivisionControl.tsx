import { css } from "../../../../styled-system/css";

const DivisionControl = () => {
	return (
		<button
			type="button"
			className={css({
				cursor: "pointer",
				color: "lamp",
				background: "none",
				border: "none",
			})}
		>
			<span
				className={css({
					fontSize: "4xl",
				})}
			>
				♪
			</span>
		</button>
	);
};

export default DivisionControl;
