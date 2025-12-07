import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { GlobalLayout } from "./ui/layouts/GlobalLayout.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<GlobalLayout>
			<App />
		</GlobalLayout>
	</StrictMode>
);
