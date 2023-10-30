const Product = require("../models/productModel");

exports.productList = async (req, res) => {
	try {
		const { searchKeyword, pageNo, perPage } = req.params;
		const pageNumber = Number(pageNo) || 1;
		const perPageNumber = Number(perPage) || 10;
		const skipRows = (pageNumber - 1) * perPageNumber;

		const searchQuery = {};
		if (searchKeyword !== "0") {
			const searchRegex = { $regex: searchKeyword, $options: "i" };
			searchQuery.$or = [
				{ title: searchRegex },
				{ brand: searchRegex },
				{ category: searchRegex },
				{ subcategory: searchRegex },
			];
		}
		const totalCount = (
			await Product.aggregate([
				{ $match: searchQuery },
				{ $count: "total" },
			])
		)[0]["total"]; //array of object

		const rowsData = await Product.aggregate([
			{ $match: searchQuery },
			{ $skip: skipRows },
			{ $limit: perPageNumber },
		]);
		res.status(200).json({ total: totalCount, productData: rowsData });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred" });
	}
};

exports.createProduct = async (req, res) => {
	try {
		const {
			title,
			price,
			special_price,
			image,
			category,
			subcategory,
			remark,
			brand,
			shop,
			shop_name,
			star,
			product_code,
			stock,
		} = req.body;

		switch (true) {
			case !title.trim():
				return res.json({ error: "Title is required" });
			case !price:
				return res.json({ error: "Price is required" });
			case !image:
				return res.json({ error: "Image url is required" });
			case !category.trim():
				return res.json({ error: "Category is required" });
			case !brand.trim():
				return res.json({ error: "Brand is required" });
			case !shop_name.trim():
				return res.json({ error: "Shop name is required" });
			case !product_code:
				return res.json({ error: "Product code  is required" });
			case !stock:
				return res.json({ error: "Stock is required" });
		}
		const createdProduct = await new Product({
			...req.body,
		}).save();
		res.json(createdProduct);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "An error occurred" });
	}
};

exports.productById = async (req, res) => {
	try {
		const { productId } = req.params;
		const foundProduct = await Product.findById(productId);
		res.json(foundProduct);
	} catch (error) {
		console.error(error.message);
		req.status(500).json({ error: "Internal server error" });
	}
};

exports.productUpdate = async (req, res) => {
	try {
		const {
			title,
			price,
			special_price,
			image,
			category,
			subcategory,
			remark,
			brand,
			shop,
			shop_name,
			star,
			product_code,
			stock,
		} = req.body;

		switch (true) {
			case !title.trim():
				return res.json({ error: "Title is required" });
			case !price:
				return res.json({ error: "Price is required" });
			case !image:
				return res.json({ error: "Image url is required" });
			case !category.trim():
				return res.json({ error: "Category is required" });
			case !brand.trim():
				return res.json({ error: "Brand is required" });
			case !shop_name.trim():
				return res.json({ error: "Shop name is required" });
			case !product_code:
				return res.json({ error: "Product code  is required" });
			case !stock:
				return res.json({ error: "Stock is required" });
		}

		const updatedProduct = await Product.findByIdAndUpdate(
			...req.params.productId,
			{ ...req.body },
			{ new: true }
		);
		res.json(updatedProduct);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: "Server error" });
	}
};

exports.productDelete = async (req, res) => {
	try {
		const deletedProduct = await Product.findByIdAndDelete(
			req.params.productId
		);
		res.json(deletedProduct);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};
