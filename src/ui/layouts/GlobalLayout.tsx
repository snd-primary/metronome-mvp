import type React from "react";
import { css } from "../../../styled-system/css";
import { MainLayout } from "./MainLayout";

type Props = {
	children: React.ReactNode;
};

export const GlobalLayout: React.FC<Props> = ({ children }) => {
	return (
		<div
			className={css({
				background: "gray.900",
				color: "white",
				display: "grid",
				gridTemplateColumns: "1fr",
				gridTemplateRows: "5vh 1fr 5vh",
				h: "100vh",
				w: "full",
			})}
		>
			<header
				className={css({
					display: "grid",
					alignItems: "center",
					border: "1px solid #fa0000",
					p: 4,
				})}
			>
				ヘッダー
			</header>
			<MainLayout>{children}</MainLayout>
			<footer
				className={css({
					border: "1px solid #fa0000",
					p: 4,
				})}
			>
				フッター
			</footer>
		</div>
	);
};
