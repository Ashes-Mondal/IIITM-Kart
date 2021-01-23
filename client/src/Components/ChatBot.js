import React from "react";
import ChatBotSimple from "react-simple-chatbot";

const ChatBot = ({ user, isAuth }) => {
  const DisplayOrders = () => {
    return (
      <div>
        {console.log("user.orders is:", user.orders)}
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
  const DisplayPayments = () => {
    return <>PAYMENTS</>;
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
        message: `Hello ${user.name.firstName}, What do you want to do?`,
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
        message: "Here are your payments:",
        trigger: "paymentsList",
      },
      {
        id: "paymentsList",
        component: DisplayPayments(),
      },
      {
        id: "contactDetails",
        message: "Here are your contactDetails:",
        trigger: "orderList",
      },
      {
        id: "orderList",
        component: DisplayOrders(),
      },
      {
        id: "3",
        message: "Wrong answer, try again.",
        trigger: "options",
      },
    ];
  }
  return (
    <div>
      <ChatBotSimple steps={steps} floating={true} />
    </div>
  );
};

export default ChatBot;
