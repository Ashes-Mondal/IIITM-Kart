import React, { useState } from "react";
const Navbar2 = ({ itemList, setItemList }) => {
	const [sortBy, setSortBy] = useState("Category");
	const [category, setCategory] = useState("");
	const handleSearchSubmit = async (search) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ Search: search }),
		};
		const result = await (await fetch("/search", requestOptions)).json();
		if (result.response === false) {
			alert("Could not find the result!!");
		} else {
			setItemList(result.itemList);
		}
	};
	return (
		<nav className="navbar2">
			<div className="dropdown1 ml-3 mt-1">
				<button className="dropbtn">
					<b>Sort By: </b>
					{sortBy}
				</button>
				<div className="dropdown-content1">
					<li
						onClick={() => {
							setSortBy("Category");
							let newItemList = itemList.sort((a, b) =>
								a.category > b.category ? -1 : 1
							);
							setItemList([...newItemList]);
						}}
					>
						Category
					</li>
					<li
						onClick={() => {
							setSortBy("Cost Ascending");
							let newItemList = itemList.sort((a, b) =>
								a.cost > b.cost ? 1 : -1
							);
							setItemList([...newItemList]);
						}}
					>
						Cost Ascending
					</li>
					<li
						onClick={() => {
							setSortBy("Cost Descending");
							let newItemList = itemList.sort((a, b) =>
								a.cost < b.cost ? 1 : -1
							);
							setItemList([...newItemList]);
						}}
					>
						Cost Descending
					</li>
					<li
						onClick={() => {
							setSortBy("Rating");
							let newItemList = itemList.sort((a, b) =>
								a.rating > b.rating ? -1 : 1
							);
							setItemList([...newItemList]);
						}}
					>
						Rating
					</li>
				</div>
			</div>
			<span
				className={
					category === "Mobile" ? "categories categoriesClicked" : "categories"
				}
				onClick={() => {
					setCategory("Mobile");
					handleSearchSubmit("Mobile");
				}}
			>
				Mobiles
			</span>
			<span
				className={
					category === "Men clothing"
						? "categories categoriesClicked"
						: "categories"
				}
				onClick={() => {
					setCategory("Men clothing");
					handleSearchSubmit("Men clothing");
				}}
			>
				Men's Clothing
			</span>
			<span
				className={
					category === "Women Clothing"
						? "categories categoriesClicked"
						: "categories"
				}
				onClick={() => {
					setCategory("Women Clothing");
					handleSearchSubmit("Women Clothing");
				}}
			>
				Women's Clothing
			</span>
			<span
				className={
					category === "Kids"
						? "categories categoriesClicked"
						: "categories"
				}
				onClick={() => {
					setCategory("Kids");
					handleSearchSubmit("Kids");
				}}
			>
				Kids
			</span>
			<span
				className="clearFilters"
				onClick={() => {
					window.location.href = "/";
				}}
			>
				Clear Filters
			</span>
		</nav>
	);
};

export default Navbar2;
