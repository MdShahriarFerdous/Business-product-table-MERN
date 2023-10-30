import React, { useState, useEffect } from "react";
import { useData } from "../context/dataContext";
import { GetProducts } from "./../backend-services/apiRequest";
import { useLoader } from "../context/loaderContext";
import ReactPaginate from "react-paginate";

const ProductList = () => {
	const [fetchData, setFetchData] = useData();
	const [setLoader] = useLoader();

	const [searchKeyword, setSearchKeyword] = useState("0");
	const [perPage, setPerPage] = useState(5);

	useEffect(() => {
		getProducts(1, perPage, searchKeyword);
	}, [perPage, searchKeyword]);

	const getProducts = async (page, perPage, keyword) => {
		setLoader(true);
		const data = await GetProducts(page, perPage, keyword);
		if (data) {
			setFetchData({
				...fetchData,
				total: data.total,
				productData: data.productData,
			});
		}
		setLoader(false);
	};

	const handlePageClick = (event) => {
		getProducts(event.selected + 1, perPage, searchKeyword);
	};

	const PageKeyOnChange = (event) => {
		setPerPage(parseInt(event.target.value));
	};

	const searchOnChange = (event) => {
		setSearchKeyword(event.target.value);
	};

	const handleSearchData = () => {
		getProducts(1, perPage, searchKeyword);
	};

	const productsData = fetchData.productData;
	const totalDataCount = fetchData.total;
	return (
		<div className="container my-5">
			<div className="row">
				<div className="col-12">
					<div className="card">
						<div className="card-body">
							<div className="container-fluid">
								<div className="row">
									<div className="col-6">
										<h5>My Product List</h5>
									</div>
									<div className="col-2">
										<select
											onChange={PageKeyOnChange}
											className="form-control mx-2 form-select-sm form-select form-control-sm"
										>
											<option value="5">
												5 Per Page
											</option>
											<option value="10">
												10 Per Page
											</option>
											<option value="20">
												20 Per Page
											</option>
											<option value="30">
												30 Per Page
											</option>
											<option value="50">
												50 Per Page
											</option>
											<option value="100">
												100 Per Page
											</option>
											<option value="200">
												200 Per Page
											</option>
											<option value="200">
												200 Per Page
											</option>
										</select>
									</div>
									<div className="col-4">
										<div className="input-group mb-3">
											<input
												onChange={searchOnChange}
												type="text"
												className="form-control form-control-sm"
												placeholder="Search.."
												aria-label="Recipient's username"
												aria-describedby="button-addon2"
											/>
											<button
												onClick={handleSearchData}
												className="btn btn-outline-primary btn-sm mb-0"
												type="button"
											>
												Search
											</button>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-12 ">
										<div className="table-responsive data-table ">
											<table className="table">
												<thead className="sticky-top bg-white">
													<tr>
														<th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
															Product
														</th>
														<th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
															Price
														</th>
														<th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
															Stock
														</th>
														<th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
															Code
														</th>
													</tr>
												</thead>
												<tbody>
													{productsData.map(
														(product, i) => (
															<tr
																key={
																	product._id
																}
															>
																<td>
																	<div className="d-flex px-2 py-1">
																		<div>
																			<img
																				src={
																					product.image
																				}
																				className="avatar me-3"
																			/>
																		</div>
																		<div className="d-flex flex-column justify-content-center">
																			<h6 className="mb-0  text-xs">
																				{
																					product.title
																				}
																			</h6>
																			<p className="text-xs  text-secondary mb-0">
																				{
																					product.category
																				}
																			</p>
																		</div>
																	</div>
																</td>
																<td>
																	<p className="text-xs font-weight-bold mb-0">
																		{
																			product.brand
																		}
																	</p>
																	<p className="text-xs text-secondary mb-0">
																		{
																			product.price
																		}{" "}
																		Taka{" "}
																	</p>
																</td>
																<td>
																	<p className="badge bg-gradient-success">
																		{
																			product.stock
																		}{" "}
																		Items{" "}
																	</p>
																</td>
																<td>
																	<span className="text-secondary text-center text-xs font-weight-bold">
																		{
																			product.product_code
																		}
																	</span>
																</td>
															</tr>
														)
													)}
												</tbody>
											</table>
										</div>
									</div>

									<div className="col-12 mt-5">
										<nav aria-label="Page navigation example">
											<ReactPaginate
												previousLabel="<"
												nextLabel=">"
												pageClassName="page-item"
												pageLinkClassName="page-link"
												previousClassName="page-item"
												previousLinkClassName="page-link"
												nextClassName="page-item"
												nextLinkClassName="page-link"
												breakLabel="..."
												breakClassName="page-item"
												breakLinkClassName="page-link"
												pageCount={
													totalDataCount / perPage
												}
												marginPagesDisplayed={2}
												pageRangeDisplayed={5}
												onPageChange={handlePageClick}
												containerClassName="pagination"
												activeClassName="active"
											/>
										</nav>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductList;
