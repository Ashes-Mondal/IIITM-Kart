const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const { UserDetail } = require("../models/userSchema");
// const logo = require("./logo.png");
// const capture = require("./Capture.PNG");
// import logo from "./logo.png";
// import siteName from "./Capture.PNG";

let mailtransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_EMAIL_PWD,
  },
});

exports.paymentCompletionMail = async (orderDetails, res) => {
  const {
    _id,
    user,
    order,
    dateOfOrder,
    totalCost,
    shippingAddress,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature,
  } = orderDetails;
  const { name, phone, email } = user;
  const { firstName, lastName } = name;
  const html = `
  <div style="
background-color: royalblue;
border: 3px solid black;
margin-left: 3rem;
margin-right: 3rem;
margin-top: 2rem;
font-family: 'Montserrat', sans-serif;
">
    <a style="display: flex;
    padding-top: 1rem;
    justify-content: center;
    align-items: center;
    margin: auto;
    flex: 1 1 auto;" href="https://iiitm-kart.herokuapp.com">

    <img style="margin: 0 0 0 4px; width: 3rem; height: 3rem;" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/logo.png" alt="IIITM-Kart Logo" /></img>

    <img style="margin: 0 0 0 4px; width: 30vw; height: 4rem;" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/Capture.PNG" alt="IIITM-Kart" /></img>
    </a>

    <div style="margin: 2rem 12% 4rem;
    width: auto;
    font-size: 1rem;
    border: 3px solid black;
    font-family: 'Montserrat', sans-serif;
    border-radius: 2px;
    padding-left: 1rem;
    background-color: rgb(250, 120, 120);
    position: relative;">

    <p style="font-size: 1rem;">
        Dear, ${firstName} ${lastName}, Your payment has been completed.<br><br>
        Order Id: ${razorpayOrderId}<br>
        Date of Order: ${dateOfOrder}<br>
        Total Cost: Rs ${totalCost}<br>
        Shipping Address: ${shippingAddress}<br>
        Your Payment details: ${razorpayPaymentId}<br>
    </p>

    <button style="border: 2px solid brown;
    border-radius: 4px;
	margin-bottom: 1rem;
	display: block;
	margin-right: auto;
	margin-left: auto;
    font-family: 'Montserrat', sans-serif;
    background-color: royalblue;
    text-align: center;
    cursor: pointer;"><a style="text-decoration: none; color: whitesmoke; font-size: 2rem" href='https://iiitm-kart.herokuapp.com/user'>See Your Order</a></button>
    </div>

    <div style="margin: 2rem 12% 4rem;
    width: auto;
    font-size: 1rem;
    border: 3px solid black;
    font-family: 'Montserrat', sans-serif;
    border-radius: 2px;
    padding-left: 1rem;
    background-color: rgb(250, 120, 120);
    position: relative;">

        <h2 style="text-align: center;">Thank you for shopping from IIITM Kart<h2>
        <h6 style="text-align: center;">Payment Gateway powered by <a href='https://razorpay.com'>RazorPay</a></h6>
    </div>
    <footer style="text-align: center;">
        Copyright © IIITM Kart 2021.
    </footer>
		
	`;
  await mailtransport.sendMail(
    {
      from: process.env.HOST_EMAIL,
      to: email,
      subject: "IIITM Kart: Your payment has been completed",
      html: html,
    },
    function(err) {
      if (err) {
        res.send({
          response: false,
          orderId: _id,
          error: "Some error occurred while sending the mail",
          msg: err,
        });
      } else {
        res.send({ response: true, orderId: _id });
      }
    }
  );
};

exports.WelcomeMail = async (userDetails, res) => {
  const { name, email } = userDetails;
  const { firstName, lastName } = name;
  const html = `
  <div style="
background-color: royalblue;
border: 3px solid black;
margin-left: 3rem;
margin-right: 3rem;
margin-top: 2rem;
font-family: 'Montserrat', sans-serif;
">
    <a style="display: flex;
    padding-top: 1rem;
    justify-content: center;
    align-items: center;
    margin: auto;
    flex: 1 1 auto;" href="https://iiitm-kart.herokuapp.com">

    <img style="margin: 0 0 0 4px; width: 3rem; height: 3rem;" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/logo.png" alt="IIITM-Kart Logo" /></img>

    <img style="margin: 0 0 0 4px; width: 30vw; height: 3rem;" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/Capture.PNG" alt="IIITM-Kart" /></img>
	</a>
	<div style="margin: 2rem 12% 4rem;
    width: auto;
    font-size: 1rem;
    border: 3px solid black;
    font-family: 'Montserrat', sans-serif;
    border-radius: 2px;
    padding-left: 1rem;
    background-color: rgb(250, 120, 120);
    position: relative;">

    <p style="text-align: center; font-size: 1rem;">
        Welcome, ${firstName} ${lastName}<br>
        <h2>Thank you for choosing IIITM Kart for shopping<h2>
	</p>
    </div>
    <footer style="text-align: center;">
        Copyright © IIITM Kart 2021.
    </footer>
</div>
	`;
  await mailtransport.sendMail(
    {
      from: process.env.HOST_EMAIL,
      to: email,
      subject: `Welcome to IIITM Kart ${firstName}`,
      html: html,
    },
    function(err) {
      if (err) {
        res.send({
          response: true,
          error: "Some error occurred while sending the mail",
          msg: err,
        });
      } else {
        res.send({ response: true });
      }
    }
  );
};

exports.cancelOrderMail = async (orderDetails, res) => {
  const { totalCost, user, razorpayOrderId } = orderDetails;
  const { name, email } = user;
  const { firstName, lastName } = name;
  const html = `
  <div style="
background-color: royalblue;
border: 3px solid black;
margin-left: 3rem;
margin-right: 3rem;
margin-top: 2rem;
font-family: 'Montserrat', sans-serif;
">
    <a style="display: flex;
    padding-top: 1rem;
    justify-content: center;
    align-items: center;
    margin: auto;
    flex: 1 1 auto;" href="https://iiitm-kart.herokuapp.com">

    <img style="margin: 0 0 0 4px; width: 3rem; height: 3rem;" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/logo.png" alt="IIITM-Kart Logo" /></img>

    <img style="margin: 0 0 0 4px; width: 30vw; height: 3rem;" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/Capture.PNG" alt="IIITM-Kart" /></img>
	</a>
	<div style="margin: 2rem 12% 4rem;
    width: auto;
    font-size: 1rem;
    border: 3px solid black;
    font-family: 'Montserrat', sans-serif;
    border-radius: 2px;
    padding-left: 1rem;
    background-color: rgb(250, 120, 120);
    position: relative;">

    <p style="text-align: center; font-size: 1rem;">
		Dear,${firstName} ${lastName}<br>
		<em>Your order has been cancelled successfully</em><br>
		Total Cost: Rs ${totalCost}<br>
		For any future query refer this Order Id: ${razorpayOrderId}
        <h3 style="text-align: center;">Thank you for choosing IIITM Kart for shopping</h3>
	</p>
    </div>
    <footer style="text-align: center;">
        Copyright © IIITM Kart 2021.
    </footer>
</div>
	`;
  await mailtransport.sendMail(
    {
      from: process.env.HOST_EMAIL,
      to: email,
      subject: `IIITM Kart:Ordered Cancelled`,
      html: html,
    },
    function(err) {
      if (err) {
        res.send({
          response: true,
          error: "Some error occurred while sending the mail",
          msg: err,
        });
      } else {
        res.send({ response: true });
      }
    }
  );
};

exports.returnOrderMail = async (orderDetails, res) => {
  const { totalCost, user, razorpayOrderId } = orderDetails;
  const { name, email } = user;
  const { firstName, lastName } = name;
  const html = `
  <div style="
background-color: royalblue;
border: 3px solid black;
margin-left: 3rem;
margin-right: 3rem;
margin-top: 2rem;
font-family: 'Montserrat', sans-serif;
">
    <a style="display: flex;
    padding-top: 1rem;
    justify-content: center;
    align-items: center;
    margin: auto;
    flex: 1 1 auto;" href="https://iiitm-kart.herokuapp.com">

    <img style="margin: 0 0 0 4px; width: 3rem; height: 3rem;" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/logo.png" alt="IIITM-Kart Logo" /></img>

    <img style="margin: 0 0 0 4px; width: 30vw; height: 3rem;" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/Capture.PNG" alt="IIITM-Kart" /></img>
	</a>
	<div style="margin: 2rem 12% 4rem;
    width: auto;
    font-size: 1rem;
    border: 3px solid black;
    font-family: 'Montserrat', sans-serif;
    border-radius: 2px;
    padding-left: 1rem;
    background-color: rgb(250, 120, 120);
    position: relative;">

    <p style="text-align: center; font-size: 1rem;">
		Dear,${firstName} ${lastName}<br>
		<em>Your order has been returned successfully</em><br>
		Total Cost: Rs ${totalCost}<br>
		For any future query refer this Order Id: ${razorpayOrderId}
        <h3 style="text-align: center;">Thank you for choosing IIITM Kart for shopping</h3>
	</p>
    </div>
    <footer style="text-align: center;">
        Copyright © IIITM Kart 2021.
    </footer>
</div>
	`;
  await mailtransport.sendMail(
    {
      from: process.env.HOST_EMAIL,
      to: email,
      subject: `IIITM Kart:Ordered Returned`,
      html: html,
    },
    function(err) {
      if (err) {
        res.send({
          response: true,
          error: "Some error occurred while sending the mail",
          msg: err,
        });
      } else {
        res.send({ response: true });
      }
    }
  );
};

exports.signupEmailValidation = async (req, res) => {
  //validation of email and phone
  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function validatePhone(phone) {
    if (phone.length > 10) return false;
    const re = /\d{10}/;
    return re.test(phone);
  }
  if (!validateEmail(req.body.email)) {
    res.send({
      response: false,
      error: "Email not in valid format ( example@example.com)",
    });
    return;
  } else if (!validatePhone(req.body.phone)) {
    res.send({
      response: false,
      error: "phone not in valid format ( 10 digits)",
    });
    return;
  }
  const customerEmail = req.body.email;
  const customer = await UserDetail.findOne({ email: customerEmail });
  if (customer !== null) {
    res.send({ response: false, error: "Email already exists!" });
    return;
  }
  const phoneValidation = await UserDetail.findOne({ phone: req.body.phone });
  if (phoneValidation !== null) {
    res.send({ response: false, error: "Phone Number already existing!" });
    return;
  }
  const otp = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });
  const html = `
  <div style="
background-color: royalblue;
border: 3px solid black;
margin-left: 3rem;
margin-right: 3rem;
margin-top: 2rem;
font-family: 'Montserrat', sans-serif;
">
    <a style="display: flex;
    padding-top: 1rem;
    justify-content: center;
    align-items: center;
    margin: auto;
    flex: 1 1 auto;" href="https://iiitm-kart.herokuapp.com">

    <img style="margin: 0 0 0 4px; width: 3rem; height: 3rem;" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/logo.png" alt="IIITM-Kart Logo" /></img>

    <img style="margin: 0 0 0 4px; width: 30vw; height: 3rem;" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/Capture.PNG" alt="IIITM-Kart" /></img>
	</a>
	<div style="margin: 2rem 12% 4rem;
    width: auto;
    font-size: 1rem;
    border: 3px solid black;
    font-family: 'Montserrat', sans-serif;
    border-radius: 2px;
    padding-left: 1rem;
    background-color: rgb(250, 120, 120);
    position: relative;">

    <p style="font-size: 1rem;">
        Dear, ${req.body.firstName} ${req.body.lastName}, please do find the otp and do not share with others:<br><br>
        <h2 style="text-align: center;">OTP:${otp}</h2>
	</p>
    </div>
    <footer style="text-align: center;">
        Copyright © IIITM Kart 2021.
    </footer>
</div>
	`;

  await mailtransport.sendMail(
    {
      from: process.env.HOST_EMAIL,
      to: customerEmail,
      subject: "IIITM Kart Email verification",
      html: html,
    },
    function(err) {
      if (err)
        res.send({
          response: false,
          error: "Some error occurred! please retry",
          err: err,
        });
      else res.send({ response: true, otp: otp });
    }
  );
};
