const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const { UserDetail } = require("../models/userSchema");

// https://www.google.com/settings/security/lesssecureapps
let mailtransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.HOST_EMAIL,
    pass: process.env.HOST_EMAIL_PWD,
  },
});

exports.emailValidation = async (req, res) => {
  const customerEmail = req.body.email;
  const customer = await UserDetail.findOne({ email: customerEmail });
  if (customer === null) {
    res.send({ response: false, error: "Could not find the email address" });
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
        Dear, ${customer.name.firstName} ${customer.name.lastName},<br>
        <em>please do find the otp and do not share with others:</em>
        <h3>OTP: ${otp}</h3>
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
      subject: "IIITM Kart reset password",
      html: html,
    },
    function(err) {
      if (err)
        res.send({
          response: false,
          error: "Some error occurred! please retry",
          err: err,
        });
      else res.send({ response: true, otp: otp, userId: customer._id });
    }
  );
};

exports.resetPassword = async (req, res) => {
  const newPassword = await bcrypt.hash(req.body.password, 12);
  const userId = req.body.userId;

  await UserDetail.findByIdAndUpdate(
    userId,
    { password: newPassword },
    (err) => {
      if (err) res.send({ response: false, error: err });
      else res.send({ response: true });
    }
  );
};
