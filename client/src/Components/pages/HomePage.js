import React from "react";
import ProductCard from "../ProductCard";
// import { useHistory } from "react-router-dom";
import Navbar2 from "../Navbar2";
import CarouselPage from "../CarouselPage";
// import Carousel from "react-bootstrap/Carousel";
const HomePage = ({ itemList, cart, setCart, setItemList }) => {
  // const history = useHistory();
  return (
    <>
      <Navbar2 itemList={itemList} setItemList={setItemList} />
      <CarouselPage indicators={false} />
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
