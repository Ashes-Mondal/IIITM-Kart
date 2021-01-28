const nodemailer = require("nodemailer");
const otpGenerator = require("otp-generator");
const { UserDetail } = require("../models/userSchema");

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
    <h2>Dear,<em>${firstName} ${lastName}</em> </h2>
    <h2>Your payment has been completed</h2>
        <div style = "display:flex"><span><h3>Order Id:  </h3></span><span><h4>${razorpayOrderId}</h4></span></div>
        <div style = "display:flex"><span><h3>Date of Order:</h3></span><span><h4>${dateOfOrder}</h4></span></div>
        <div style = "display:flex"><span><h3>Total Cost: </h3></span><span><h4> RS ${totalCost}</h4></span></div>
        <div style = "display:flex"><span><h3>Shipping Address: </h3></span><span><h4>${shippingAddress}</h4></span></div>
    <h2>Your Payment details:</h2>
        <div style = "display:flex"><span><h3>RazorPay Payment Id: </h3></span><span><h4>${razorpayPaymentId}</h4></span></div>
	<h2>Thank you for shopping from IIITM Kart<h2>
	<div><h6>Payment Gateway powered by RazorPay</h6></div>
		
	`;
	await mailtransport.sendMail(
		{
			from: process.env.HOST_EMAIL,
			to: email,
			subject: "IIITM Kart: Your payment has been completed",
			html: html,
		},
		function (err) {
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
    <h2>Welcome,<em>${firstName} ${lastName}</em> </h2>
    <h2>Thank you for choosing IIITM Kart for shopping<h2>
	`;
	await mailtransport.sendMail(
		{
			from: process.env.HOST_EMAIL,
			to: email,
			subject: `Welcome to IIITM Kart ${firstName}`,
			html: html,
		},
		function (err) {
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
	const { totalCost, user,razorpayOrderId } = orderDetails;
	const { name, email } = user;
	const { firstName, lastName } = name;
	const html = `
	<h2>Dear,<em>${firstName} ${lastName}</em> </h2>
	<h2>Your order has been cancelled successfully<h2>
	<h2>Total Cost: Rs ${totalCost} <h2>
	<h3>For any future query refer this Order Id: ${razorpayOrderId}<h3>
    <h2>Thank you for choosing IIITM Kart for shopping<h2>
	`;
	await mailtransport.sendMail(
		{
			from: process.env.HOST_EMAIL,
			to: email,
			subject: `IIITM Kart:Ordered Cancelled`,
			html: html,
		},
		function (err) {
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
	const { totalCost, user,razorpayOrderId } = orderDetails;
	const { name, email } = user;
	const { firstName, lastName } = name;
	const html = `
	<h2>Dear,<em>${firstName} ${lastName}</em> </h2>
	<h2>Your order has been returned successfully<h2>
	<h2>Total Cost: Rs ${totalCost} <h2>
	<h3>For any future query refer this Order Id: ${razorpayOrderId}<h3>
    <h2>Thank you for choosing IIITM Kart for shopping<h2>
	`;
	await mailtransport.sendMail(
		{
			from: process.env.HOST_EMAIL,
			to: email,
			subject: `IIITM Kart:Ordered Returned`,
			html: html,
		},
		function (err) {
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
		if(phone.length > 10) return false;
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
	<h2>Dear,<strong>${req.body.firstName} ${req.body.lastName}</strong> </h2>
	<h3>please do find the otp and do not share with others</h3>
	<h2>OTP:${otp}</h2>
	`;

	await mailtransport.sendMail(
		{
			from: process.env.HOST_EMAIL,
			to: customerEmail,
			subject: "IIITM Kart Email verification",
			html: html,
		},
		function (err) {
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
