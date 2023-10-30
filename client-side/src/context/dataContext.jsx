import axios from "axios";
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
	const [fetchData, setFetchData] = useState({
		total: [],
		productData: [],
	});

	axios.defaults.baseURL =
		import.meta.env.VITE_API || "http://localhost:3000/api/v1";

	return (
		<DataContext.Provider value={[fetchData, setFetchData]}>
			{children}
		</DataContext.Provider>
	);
};

const useData = () => {
	return useContext(DataContext);
};
export { useData, DataProvider };
