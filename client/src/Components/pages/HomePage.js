import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import Navbar2 from "../Navbar2";
import CarouselPage from "../CarouselPage";
import SearchBox from "../SearchBox";

const HomePage = ({ itemList, cart, setCart, setItemList }) => {
	const [showSearchBar, setShowSearchBar] = useState(false);
	useEffect(() => {
		const setResponsiveness = () => {
			if (window.innerWidth < 580) return setShowSearchBar(true);
			else return setShowSearchBar(false);
		};

		setResponsiveness();
		window.addEventListener("resize", () => setResponsiveness());

		return;
		window.removeEventListener("resize", () => setResponsiveness());
	});
	return (
		<>
			{showSearchBar ? <SearchBox /> : null}
			<Navbar2 itemList={itemList} setItemList={setItemList} />
			<CarouselPage />
			<div className="row justify-content-center images-container">
				{itemList.map((item, i) => {
					return (
						<ProductCard key={i} cart={cart} setCart={setCart} product={item} />
					);
				})}
			</div>
		</>
	);
};

export default HomePage;
