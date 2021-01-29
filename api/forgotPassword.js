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
        Dear, ${customer.name.firstName} ${customer.name.lastName}, please do find the otp and do not share with others:<br><br>
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
