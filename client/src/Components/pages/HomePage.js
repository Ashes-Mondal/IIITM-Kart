import React from "react";
import Card from "../Card";
import Navbar2 from "../Navbar2";

const HomePage = ({ itemList, cart, setCart, setItemList }) => {
  return (
    <>
      <Navbar2 itemList={itemList} setItemList={setItemList} />
      <div className="homePage row justify-content-center mr-0">
        {itemList.map((item, i) => {
          return <Card key={i} cart={cart} setCart={setCart} product={item} />;
        })}
      </div>
    </>
  );
};

export default HomePage;
