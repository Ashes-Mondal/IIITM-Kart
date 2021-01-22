import React from "react";
import ProductCard from "../ProductCard";
import { useHistory } from "react-router-dom";
import Navbar2 from "../Navbar2";
import Carousel from "react-bootstrap/Carousel";

const HomePage = ({ itemList, cart, setCart, setItemList }) => {
  const history = useHistory();
  return (
    <>
      <Navbar2 itemList={itemList} setItemList={setItemList} />
      <br />
      <Carousel>
        <Carousel.Item interval={5000}>
          <img
            className="advertise"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/JanART21/Renewed/1500x300_refurbished_PC.jpg"
            alt="First slide"
            onClick={() => {
              history.push("/productDetails/5fe1535fab0e1cd6ff989368");
            }}
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="advertise"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img18/Fashion/March/WRS/GW/Bunks/1500by300_WRS._CB499915175_.jpg"
            alt="Second slide"
            onClick={() => {
              history.push("/productDetails/5fe15647ab0e1cd6ff98936b");
            }}
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="advertise"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/SNS/Jan21ART/Baby_1500x300.jpg"
            alt="Third slide"
            onClick={() => {
              history.push("/productDetails/60052d6dac871a5d5a4db6e3");
            }}
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="advertise"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img16/men-apparel/201708/GW/GW_PC_Hero_1500x300_-festiv._V517410320_.jpg"
            alt="Fourth slide"
            onClick={() => {
              history.push("/productDetails/5fe15943ab0e1cd6ff98936e");
            }}
          />
        </Carousel.Item>
        <Carousel.Item interval={5000}>
          <img
            className="advertise"
            src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/AmazonPay/PDAYILM/v1/01.jpg"
            alt="Fifth slide"
            onClick={() => {
              history.push("/");
            }}
          />
        </Carousel.Item>
      </Carousel>
      <br />
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
