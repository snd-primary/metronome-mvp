import { css } from "../styled-system/css";
import { Visualizor } from "./features/beat/components/Visualizor";

const App = () => {
	return (
		<div
			className={css({
				display: "grid",
				alignItems: "start",
			})}
		>
			<Visualizor />
		</div>
	);
};

export default App;
