import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductList from "./pages/ProductList";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<ProductList />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
