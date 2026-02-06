import { css } from "../../../../styled-system/css";

const DivisionControl = () => {
	return (
		<button
			type="button"
			className={css({
				cursor: "pointer",
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
