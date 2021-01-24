import React from "react";
import {
	MDBCarousel,
	MDBCarouselInner,
	MDBCarouselItem,
	MDBView,
	// MDBContainer,
} from "mdbreact";
import { useHistory } from "react-router-dom";

const CarouselPage = () => {
    const history = useHistory();
	return (
		<div style={{ margin: "0", width: "100vw",height:"auto", backgroundColor: "red" }}>
			<MDBCarousel
				activeItem={1}
				length={5}
				showControls={true}
				showIndicators={true}
                interval={5000}
                style={{zIndex:0}}
			>
				<MDBCarouselInner>
					<MDBCarouselItem
						itemId="1"
						style={{ display: "block", margin: "0", width: "100vw" }}
					>
						<MDBView>
							<img
								style={{ margin: 0 ,objectFit:"cover",height:"auto"}}
								className="d-block w-100"
								src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/Wireless/JanART21/Renewed/1500x300_refurbished_PC.jpg"
                                alt="First slide"
                                onClick={() => {
                                    history.push("/productDetails/5fe1535fab0e1cd6ff989368");
                                }}
							/>
						</MDBView>
					</MDBCarouselItem>
					<MDBCarouselItem
						itemId="2"
						style={{ display: "block", margin: "0", width: "100vw" }}
					>
						<MDBView>
							<img
								style={{ margin: 0 ,objectFit:"cover",height:"auto"}}
								className="d-block w-100 "
								src="https://images-eu.ssl-images-amazon.com/images/G/31/img18/Fashion/March/WRS/GW/Bunks/1500by300_WRS._CB499915175_.jpg"
                                alt="Second slide"
                                onClick={() => {
                                    history.push("/productDetails/5fe15647ab0e1cd6ff98936b");
                                }}
							/>
						</MDBView>
					</MDBCarouselItem>
					<MDBCarouselItem
						itemId="3"
						style={{ display: "block", margin: "0", width: "100vw" }}
					>
						<MDBView>
							<img
								style={{ margin: 0 ,objectFit:"cover",height:"auto"}}
								className="d-block w-100 "
								src="https://images-eu.ssl-images-amazon.com/images/G/31/img20/SNS/Jan21ART/Baby_1500x300.jpg"
                                alt="Third slide"
                                onClick={() => {
                                    history.push("/productDetails/60052d6dac871a5d5a4db6e3");
                                }}
							/>
						</MDBView>
					</MDBCarouselItem>
					<MDBCarouselItem
						itemId="4"
						style={{ display: "block", margin: "0", width: "100vw" }}
					>
						<MDBView>
							<img
								style={{ margin: 0 ,objectFit:"cover",height:"auto"}}
								className="d-block w-100 "
								src="https://images-eu.ssl-images-amazon.com/images/G/31/img16/men-apparel/201708/GW/GW_PC_Hero_1500x300_-festiv._V517410320_.jpg"
                                alt="fourth slide"
                                onClick={() => {
                                    history.push("/productDetails/5fe15943ab0e1cd6ff98936e");
                                }}
							/>
						</MDBView>
					</MDBCarouselItem>
					<MDBCarouselItem
						itemId="5"
						style={{ display: "block", margin: "0", width: "100vw" }}
					>
						<MDBView>
							<img
								style={{ margin: 0 ,objectFit:"cover",height:"auto"}}
								className="d-block w-100 "
								src="https://images-eu.ssl-images-amazon.com/images/G/31/img17/AmazonPay/PDAYILM/v1/01.jpg"
                                alt="fifth slide"
                                onClick={() => {
                                    history.push("/");
                                }}
							/>
						</MDBView>
					</MDBCarouselItem>
				</MDBCarouselInner>
			</MDBCarousel>
		</div>
	);
};

export default CarouselPage;
