import React from "react";
import ChatBotSimple from "react-simple-chatbot";

const ChatBot = ({ user, isAuth }) => {
  const displayOrders = () => {
    return (
      <div>
        {user.orders !== undefined && user.orders.length > 0 ? (
          <div>
            <ol>
              {user.orders
                .slice(0)
                .reverse()
                .map((element, index) => {
                  return (
                    <li key={index}>
                      <b>Order ID :</b>
                      <b> {element._id}</b>
                      {element.order.map((item, i) => {
                        return (
                          <div key={i}>
                            <img
                              src={item.item.imageURL}
                              alt="item"
                              className="orderImgs"
                            />
                            <div>Item Name: {item.item.itemName}</div>
                            <div>Cost: {item.item.cost}</div>
                          </div>
                        );
                      })}
                      <b>Total Cost:{element.totalCost}</b>
                      <hr />
                    </li>
                  );
                })}
            </ol>
          </div>
        ) : (
          "Your Order List is Empty!"
        )}
      </div>
    );
  };
  const displayPayments = () => {
    return (
      <div>
        {user.orders !== undefined && user.orders.length > 0 ? (
          <div>
            <ol>
              {user.orders
                .slice(0)
                .reverse()
                .map((element, index) => {
                  return (
                    <li key={index}>
                      <b>Payment ID: {element.razorpayPaymentId}</b>
                      <br />
                      <b>Order ID: {element.razorpayOrderId}</b>
                      <br />
                      <b>Total Cost:{element.totalCost}</b>
                      <br />
                      <b>Payment Status: Success</b>
                    </li>
                  );
                })}
            </ol>
          </div>
        ) : (
          "Your Order List is Empty!"
        )}
      </div>
    );
  };
  const contactUs = () => {
    return (
      <div>
        <h5 className="tc">
          <a href="mailto:iiitmkart.help@gmail.com">Mail Us</a>
          <br />
          <br />
          Developers Info:
          <br />
          <span>
            <a href="https://www.linkedin.com/in/ashes-mondal-31690319a">
              Ashes
            </a>{" "}
            <a href="https://www.linkedin.com/in/subodh-rajpopat-644a81167">
              Subodh
            </a>{" "}
            <a href="https://www.linkedin.com/in/utkarsh-agnihotri-275731193">
              Utkarsh
            </a>
          </span>
        </h5>
      </div>
    );
  };
  var steps = [
    {
      id: "pleaseLogin",
      message: "Hello user, please Login to continue.",
    },
  ];

  if (isAuth) {
    steps = [
      {
        id: "1",
        message: `Hello ${user.name.firstName}, What do you want to check?`,
        trigger: "options",
      },
      {
        id: "options",
        options: [
          { value: 1, label: "Orders", trigger: "orders" },
          { value: 2, label: "Payments", trigger: "payments" },
          { value: 3, label: "Contact Us", trigger: "contactDetails" },
        ],
      },
      {
        id: "orders",
        message: "Here are your orders:",
        trigger: "orderList",
      },
      {
        id: "payments",
        message: "Showing your payments info:",
        trigger: "paymentsList",
      },
      {
        id: "contactDetails",
        message: "Feel free to contact us:",
        trigger: "contactUs",
      },
      {
        id: "orderList",
        component: displayOrders(),
        trigger: "3",
      },
      {
        id: "paymentsList",
        component: displayPayments(),
        trigger: "3",
      },
      {
        id: "contactUs",
        component: contactUs(),
        trigger: "3",
      },
      {
        id: "3",
        message: "Thanks for chatting with us!! For any other query, continue",
        trigger: "options",
      },
    ];
  }
  return (
      <ChatBotSimple steps={steps} floating={true} />
  );
};

export default ChatBot;
