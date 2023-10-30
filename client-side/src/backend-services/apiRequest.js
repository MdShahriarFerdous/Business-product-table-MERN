import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//*==================Product Lists ==================
export const GetProducts = async (pageNo, perPage, searchKeyword) => {
	try {
		const { data } = await axios.get(
			`/product-list/${pageNo}/${perPage}/${searchKeyword}`
		);
		if (data.error) {
			toast.error(data.error);
		} else {
			return data;
		}
	} catch (error) {
		console.log(error.message);
		toast.error("Fetching data failed!");
		throw error;
	}
};
