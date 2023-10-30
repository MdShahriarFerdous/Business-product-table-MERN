import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "./assets/css/bootstrap.css";
import "./index.css";
import { DataProvider } from "./context/dataContext.jsx";
import { LoaderProvider } from "./context/loaderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<LoaderProvider>
		<DataProvider>
			<App />
		</DataProvider>
	</LoaderProvider>
);
