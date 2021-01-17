import React from "react";
import ProductCard from "../ProductCard";
import Navbar2 from "../Navbar2";

const HomePage = ({ itemList, cart, setCart, setItemList }) => {
  return (
    <>
      <Navbar2 itemList={itemList} setItemList={setItemList} />
      <div className="homePageImg"></div>
      <div className="row justify-content-center m-3">
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
