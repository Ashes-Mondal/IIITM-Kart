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
  console.log("mail: ", customerEmail);
  const customer = await UserDetail.findOne({ email: customerEmail });
  if (customer === null) {
    res.send({ response: false, error: "Could not find the email address" });
    return;
  }
  console.log("customer:", customer);
  const otp = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });
  const html = `
	<h2>Dear,<strong>${customer.name.firstName} ${customer.name.lastName}</strong> </h2>
	<h3>please do find the otp and do not share with others</h3>
	<h2>OTP:${otp}</h2>
	`;

  await mailtransport.sendMail(
    {
      from: process.env.HOST_EMAIL,
      to: customerEmail,
      subject: "IIITM Kart reset password",
      html: html,
    },
    function (err) {
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

  console.log(userId, " \n", req.body.password);
  await UserDetail.findByIdAndUpdate(
    userId,
    { password: newPassword },
    (err) => {
      if (err) res.send({ response: false, error: err });
      else res.send({ response: true });
    }
  );
};
