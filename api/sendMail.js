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
  <!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>IIITM Payment Mail</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="">
      <style>
          #body-wrapper {
              margin: 2rem;
              height: 100%;
              background-color: royalblue;
              border: 3px solid black;
              font-family: 'Montserrat', sans-serif;
          }
  
          #head-container {
              display: flex;
              padding-top: 1rem;
              justify-content: center;
              align-items: center;
              margin: auto;
          }
  
          #head-container a {
              display: flex;
              height: 5vw;
              justify-content: center;
              margin: auto;
          }
  
          .site-logo {
              margin: 0 1vw 0 0;
              width: 5vw;
          }
  
          .site-name {
              width: 35vw;
          }
  
          .main-content {
              font-family: 'Montserrat', sans-serif;
              margin: 0.5rem 1rem;
              padding: 1rem;
              background-color: white;
              border: 2px solid black;
              font-size: 1rem;
              text-align: center;
          }
  
          .btn {
              background-color: darkcyan;
          }
  
          .detail {
              position: relative;
              background-color: white;
              margin-bottom: 2rem;
          }
          .detail-type{
              font-weight: bolder;
          }
          .detail-value{
              font-weight: lighter;
          }
  
       .thanking {
              margin: 2rem 12% 4rem;
              width: auto;
              font-size: 0.8rem;
              border: 3px solid black;
              font-family: 'Montserrat', sans-serif;
              border-radius: 2px;
              padding-left: 1rem;
              background-color: rgb(250, 120, 120);
              position: relative;
              text-align: center;
          }
  
  
          #footer {
              text-align: center;
          }
      </style>
  </head>
  
  <body id="body-wrapper" style="margin: 2rem;height: 100%;background-color: royalblue;border: 3px solid black;font-family: 'Montserrat', sans-serif;">
      <header id="head-container" style="display: flex;padding-top: 1rem;justify-content: center;align-items: center;margin: auto;">
          <a href="https://iiitm-kart.herokuapp.com" style="display: flex;height: 5vw;justify-content: center;margin: auto;">
              <img class="site-logo" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/logo.png" alt="IIITM-Kart Logo" style="margin: 0 1vw 0 0;width: 5vw;">
              <img class="site-name" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/Capture.PNG" alt="IIITM-Kart" style="width: 35vw;">
          </a>
      </header>
      <main id="main-container">
          <div class="main-content" style="font-family: 'Montserrat', sans-serif;margin: 0.5rem 1rem;margin-bottom: 0%;padding: 1rem;background-color: white;border: 2px solid black;font-size: 1rem;text-align: center;">
              <h3>Dear, ${firstName} ${lastName}, Your payment has been completed.</h3>
              <p>
              <div class="detail" style="position: relative;background-color: whitesmoke;margin-bottom: 1rem;"><span class="detail-type" style="font-weight: bolder;">Order Id: </span><span class="detail-value" style="font-weight: lighter;">${razorpayOrderId}</span></div>
              <div class="detail" style="position: relative;background-color: whitesmoke;margin-bottom: 1rem;"><span class="detail-type" style="font-weight: bolder;">Date of Order: </span><span class="detail-value" style="font-weight: lighter;">${dateOfOrder}</span></div>
              <div class="detail" style="position: relative;background-color: whitesmoke;margin-bottom: 1rem;"><span class="detail-type" style="font-weight: bolder;">Total Cost: </span><span class="detail-value" style="font-weight: lighter;">Rs
                      ${totalCost}</span></div>
              <div class="detail" style="position: relative;background-color: whitesmoke;margin-bottom: 1rem;"><span class="detail-type" style="font-weight: bolder;">Shipping Address: </span><span class="detail-value" style="font-weight: lighter;">${shippingAddress}</span></div>
              <div class="detail" style="position: relative;background-color: whitesmoke;margin-bottom: 2rem;"><span class="detail-type" style="font-weight: bolder;">Your Payment Id: </span><span class="detail-value" style="font-weight: lighter;">${razorpayPaymentId}</span></div>
              </p>
              <button class="btn" style="background-color: darkcyan;">
                  <a style="text-decoration: none; color: whitesmoke; font-size: 1rem" href="https://iiitm-kart.herokuapp.com/user">See Your Order
                  </a>
              </button>
          </div>
          <div class="thanking" style="margin: 2rem 12% 4rem;margin-top: 1rem;width: auto;font-size: 0.8rem;border: 3px solid black;font-family: 'Montserrat', sans-serif;border-radius: 2px;padding-left: 1rem;background-color: whitesmoke;position: relative;text-align: center;">
              <h2>Thank you for shopping from IIITM Kart</h2><h2>
                      <h5>Payment Gateway powered by <a href="https://razorpay.com">RazorPay</a></h5>
          </h2></div>
      </main>
      <footer id="footer" style="text-align: center;">Copyright © IIITM Kart 2021.</footer>
  </body>
  
  </html>
		
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
  <!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>IIITM Payment Mail</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="">
      <style>
          #body-wrapper {
              margin: 2rem;
              height: 100%;
              background-color: royalblue;
              border: 3px solid black;
              font-family: 'Montserrat', sans-serif;
          }
  
          #head-container {
              display: flex;
              padding-top: 1rem;
              justify-content: center;
              align-items: center;
              margin: auto;
          }
  
          #head-container a {
              display: flex;
              height: 5vw;
              justify-content: center;
              margin: auto;
          }
  
          .site-logo {
              margin: 0 1vw 0 0;
              width: 5vw;
          }
  
          .site-name {
              width: 35vw;
          }
  
          .main-content {
              font-family: 'Montserrat', sans-serif;
              margin: 0.5rem 1rem;
              padding: 1rem;
              background-color: white;
              border: 2px solid black;
              font-size: 1rem;
              text-align: center;
          }
  
          .btn {
              background-color: darkcyan;
          }
  
          .detail {
              position: relative;
              background-color: white;
              margin-bottom: 2rem;
          }
          .detail-type{
              font-weight: bolder;
          }
          .detail-value{
              font-weight: lighter;
          }
  
       .thanking {
              margin: 2rem 12% 4rem;
              width: auto;
              font-size: 0.8rem;
              border: 3px solid black;
              font-family: 'Montserrat', sans-serif;
              border-radius: 2px;
              padding-left: 1rem;
              background-color: rgb(250, 120, 120);
              position: relative;
              text-align: center;
          }
  
  
          #footer {
              text-align: center;
          }
      </style>
  </head>
  
  <body id="body-wrapper" style="margin: 2rem;height: 100%;background-color: royalblue;border: 3px solid black;font-family: 'Montserrat', sans-serif;">
      <header id="head-container" style="display: flex;padding-top: 1rem;justify-content: center;align-items: center;margin: auto;">
          <a href="https://iiitm-kart.herokuapp.com" style="display: flex;height: 5vw;justify-content: center;margin: auto;">
              <img class="site-logo" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/logo.png" alt="IIITM-Kart Logo" style="margin: 0 1vw 0 0;width: 5vw;">
              <img class="site-name" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/Capture.PNG" alt="IIITM-Kart" style="width: 35vw;">
          </a>
      </header>
      <main id="main-container">
      <div
        class="main-content"
        style="
          font-family: 'Montserrat', sans-serif;
          margin: 0.5rem 1rem;
          padding: 1rem;
          background-color: white;
          border: 2px solid black;
          font-size: 1rem;
          text-align: center;
        "
      >
        <h1>Welcome, ${firstName} ${lastName} to IIITM-Kart.</h1>
        <button class="btn" style="background-color: darkcyan">
          <a
            style="text-decoration: none; color: whitesmoke; font-size: 1rem"
            href="https://iiitm-kart.herokuapp.com/"
            >Start Shopping Now
          </a>
        </button>
      </div>
    </main>
    <footer id="footer" style="text-align: center">
      Copyright © IIITM Kart 2021.
    </footer>
  </body>  
  </html>

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
  <!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>IIITM Payment Mail</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="">
      <style>
          #body-wrapper {
              margin: 2rem;
              height: 100%;
              background-color: royalblue;
              border: 3px solid black;
              font-family: 'Montserrat', sans-serif;
          }
  
          #head-container {
              display: flex;
              padding-top: 1rem;
              justify-content: center;
              align-items: center;
              margin: auto;
          }
  
          #head-container a {
              display: flex;
              height: 5vw;
              justify-content: center;
              margin: auto;
          }
  
          .site-logo {
              margin: 0 1vw 0 0;
              width: 5vw;
          }
  
          .site-name {
              width: 35vw;
          }
  
          .main-content {
              font-family: 'Montserrat', sans-serif;
              margin: 0.5rem 1rem;
              padding: 1rem;
              background-color: white;
              border: 2px solid black;
              font-size: 1rem;
              text-align: center;
          }
  
          .btn {
              background-color: darkcyan;
          }
  
          .detail {
              position: relative;
              background-color: white;
              margin-bottom: 2rem;
          }
          .detail-type{
              font-weight: bolder;
          }
          .detail-value{
              font-weight: lighter;
          }
  
       .thanking {
              margin: 2rem 12% 4rem;
              width: auto;
              font-size: 0.8rem;
              border: 3px solid black;
              font-family: 'Montserrat', sans-serif;
              border-radius: 2px;
              padding-left: 1rem;
              background-color: rgb(250, 120, 120);
              position: relative;
              text-align: center;
          }
  
  
          #footer {
              text-align: center;
          }
      </style>
  </head>
  
  <body id="body-wrapper" style="margin: 2rem;height: 100%;background-color: royalblue;border: 3px solid black;font-family: 'Montserrat', sans-serif;">
      <header id="head-container" style="display: flex;padding-top: 1rem;justify-content: center;align-items: center;margin: auto;">
          <a href="https://iiitm-kart.herokuapp.com" style="display: flex;height: 5vw;justify-content: center;margin: auto;">
              <img class="site-logo" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/logo.png" alt="IIITM-Kart Logo" style="margin: 0 1vw 0 0;width: 5vw;">
              <img class="site-name" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/Capture.PNG" alt="IIITM-Kart" style="width: 35vw;">
          </a>
      </header>
      <main id="main-container">
      <div
        class="main-content"
        style="
          font-family: 'Montserrat', sans-serif;
          margin: 0.5rem 1rem;
          padding: 1rem;
          background-color: white;
          border: 2px solid black;
          font-size: 1rem;
          text-align: center;
        "
      >
        <h3>Dear, ${firstName} ${lastName}</h3>
        <em>Your order has been cancelled successfully</em><br>
        Total Cost: Rs ${totalCost}<br>
		    For any future query refer this Order Id: ${razorpayOrderId}<br><br>
        <button class="btn" style="background-color: darkcyan">
          <a
            style="text-decoration: none; color: whitesmoke; font-size: 1rem"
            href="https://iiitm-kart.herokuapp.com/"
            >Start Shopping Now
          </a>
        </button>
      </div>
    </main>
    <footer id="footer" style="text-align: center">
      Copyright © IIITM Kart 2021.
    </footer>
  </body>  
  </html>

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
  <!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>IIITM Payment Mail</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="">
      <style>
          #body-wrapper {
              margin: 2rem;
              height: 100%;
              background-color: royalblue;
              border: 3px solid black;
              font-family: 'Montserrat', sans-serif;
          }
  
          #head-container {
              display: flex;
              padding-top: 1rem;
              justify-content: center;
              align-items: center;
              margin: auto;
          }
  
          #head-container a {
              display: flex;
              height: 5vw;
              justify-content: center;
              margin: auto;
          }
  
          .site-logo {
              margin: 0 1vw 0 0;
              width: 5vw;
          }
  
          .site-name {
              width: 35vw;
          }
  
          .main-content {
              font-family: 'Montserrat', sans-serif;
              margin: 0.5rem 1rem;
              padding: 1rem;
              background-color: white;
              border: 2px solid black;
              font-size: 1rem;
              text-align: center;
          }
  
          .btn {
              background-color: darkcyan;
          }
  
          .detail {
              position: relative;
              background-color: white;
              margin-bottom: 2rem;
          }
          .detail-type{
              font-weight: bolder;
          }
          .detail-value{
              font-weight: lighter;
          }
  
       .thanking {
              margin: 2rem 12% 4rem;
              width: auto;
              font-size: 0.8rem;
              border: 3px solid black;
              font-family: 'Montserrat', sans-serif;
              border-radius: 2px;
              padding-left: 1rem;
              background-color: rgb(250, 120, 120);
              position: relative;
              text-align: center;
          }
  
  
          #footer {
              text-align: center;
          }
      </style>
  </head>
  
  <body id="body-wrapper" style="margin: 2rem;height: 100%;background-color: royalblue;border: 3px solid black;font-family: 'Montserrat', sans-serif;">
      <header id="head-container" style="display: flex;padding-top: 1rem;justify-content: center;align-items: center;margin: auto;">
          <a href="https://iiitm-kart.herokuapp.com" style="display: flex;height: 5vw;justify-content: center;margin: auto;">
              <img class="site-logo" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/logo.png" alt="IIITM-Kart Logo" style="margin: 0 1vw 0 0;width: 5vw;">
              <img class="site-name" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/Capture.PNG" alt="IIITM-Kart" style="width: 35vw;">
          </a>
      </header>
      <main id="main-container">
      <div
        class="main-content"
        style="
          font-family: 'Montserrat', sans-serif;
          margin: 0.5rem 1rem;
          padding: 1rem;
          background-color: white;
          border: 2px solid black;
          font-size: 1rem;
          text-align: center;
        "
      >
        <h3>Dear, ${firstName} ${lastName}</h3>
        <em>Your order has been returned successfully</em><br>
        Total Amount refunded: Rs ${totalCost}<br>
		    For any future query refer this Order Id: ${razorpayOrderId}<br><br>
        <button class="btn" style="background-color: darkcyan">
          <a
            style="text-decoration: none; color: whitesmoke; font-size: 1rem"
            href="https://iiitm-kart.herokuapp.com/"
            >Start Shopping Now
          </a>
        </button>
      </div>
    </main>
    <footer id="footer" style="text-align: center">
      Copyright © IIITM Kart 2021.
    </footer>
  </body>  
  </html>
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
  <!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="utf-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <title>IIITM Payment Mail</title>
      <meta name="description" content="">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="">
      <style>
          #body-wrapper {
              margin: 2rem;
              height: 100%;
              background-color: royalblue;
              border: 3px solid black;
              font-family: 'Montserrat', sans-serif;
          }
  
          #head-container {
              display: flex;
              padding-top: 1rem;
              justify-content: center;
              align-items: center;
              margin: auto;
          }
  
          #head-container a {
              display: flex;
              height: 5vw;
              justify-content: center;
              margin: auto;
          }
  
          .site-logo {
              margin: 0 1vw 0 0;
              width: 5vw;
          }
  
          .site-name {
              width: 35vw;
          }
  
          .main-content {
              font-family: 'Montserrat', sans-serif;
              margin: 0.5rem 1rem;
              padding: 1rem;
              background-color: white;
              border: 2px solid black;
              font-size: 1rem;
              text-align: center;
          }
  
          .btn {
              background-color: darkcyan;
          }
  
          .detail {
              position: relative;
              background-color: white;
              margin-bottom: 2rem;
          }
          .detail-type{
              font-weight: bolder;
          }
          .detail-value{
              font-weight: lighter;
          }
  
       .thanking {
              margin: 2rem 12% 4rem;
              width: auto;
              font-size: 0.8rem;
              border: 3px solid black;
              font-family: 'Montserrat', sans-serif;
              border-radius: 2px;
              padding-left: 1rem;
              background-color: rgb(250, 120, 120);
              position: relative;
              text-align: center;
          }
  
  
          #footer {
              text-align: center;
          }
      </style>
  </head>
  
  <body id="body-wrapper" style="margin: 2rem;height: 100%;background-color: royalblue;border: 3px solid black;font-family: 'Montserrat', sans-serif;">
      <header id="head-container" style="display: flex;padding-top: 1rem;justify-content: center;align-items: center;margin: auto;">
          <a href="https://iiitm-kart.herokuapp.com" style="display: flex;height: 5vw;justify-content: center;margin: auto;">
              <img class="site-logo" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/logo.png" alt="IIITM-Kart Logo" style="margin: 0 1vw 0 0;width: 5vw;">
              <img class="site-name" src="https://raw.githubusercontent.com/Ashes-Mondal/Ecommerce-Website/chat-bot/client/src/Components/Capture.PNG" alt="IIITM-Kart" style="width: 35vw;">
          </a>
      </header>
      <main id="main-container">
      <div
        class="main-content"
        style="
          font-family: 'Montserrat', sans-serif;
          margin: 0.5rem 1rem;
          padding: 1rem;
          background-color: white;
          border: 2px solid black;
          font-size: 1rem;
          text-align: center;
        "
      >
        Dear, ${req.body.firstName} ${req.body.lastName}<br>
        <em>please do find the otp and do not share with others:</em>
        <h3>OTP:${otp}</h3>
      </div>
    </main>
    <footer id="footer" style="text-align: center">
      Copyright © IIITM Kart 2021.
    </footer>
  </body>  
  </html>
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
