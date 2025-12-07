import type React from "react";
import { css } from "../../../styled-system/css";

type Props = {
	children: React.ReactNode;
};

export const MainLayout: React.FC<Props> = ({ children }) => {
	return (
		<main
			className={css({
				border: "1px solid #fa0000",
				p: 4,
				display: "grid",
			})}
		>
			{children}
		</main>
	);
};
