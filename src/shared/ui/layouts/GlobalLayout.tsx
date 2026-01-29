import type React from "react";
import { css } from "../../../../styled-system/css";

type Props = {
	children: React.ReactNode;
};

export const GlobalLayout: React.FC<Props> = ({ children }) => {
	return (
		<div
			className={css({
				background: "background",
				color: "foreground",
				display: "grid",
				gridTemplateColumns: "1fr",
				gridTemplateRows: "5vh 1fr 5vh",
				justifyItems: "center",
				h: "100vh",
				w: "full",
			})}
		>
			<header
				className={css({
					w: "full",
					h: "full",
					display: "grid",
					alignItems: "center",
					p: 4,
				})}
			>
				ヘッダー
			</header>
			<main
				className={css({
					w: "full",
					h: "full",
					p: 4,
					display: "grid",
					maxW: "full",
				})}
			>
				{children}
			</main>
			<footer
				className={css({
					w: "full",
					h: "full",
					p: 4,
				})}
			>
				フッター
			</footer>
		</div>
	);
};
