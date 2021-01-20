const nodemailer = require("nodemailer");

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
        <div style = "display:flex"><span><h3>Order Id:  </h3></span><span><h4>${_id}</h4></span></div>
        <div style = "display:flex"><span><h3>Date of Order:</h3></span><span><h4>${dateOfOrder}</h4></span></div>
        <div style = "display:flex"><span><h3>Total Cost: </h3></span><span><h4>RS ${totalCost}</h4></span></div>
        <div style = "display:flex"><span><h3>Shipping Address: </h3></span><span><h4>${shippingAddress}</h4></span></div>
    <h2>Your Payment details:</h2>
        <div style = "display:flex"><span><h3>Payment Id: </h3></span><span><h4>${razorpayPaymentId}</h4></span></div>
        <div style = "display:flex"><span><h3>Order Id: </h3></span><span><h4>${razorpayOrderId}</h4></span></div>
    <h2>Thank you for shopping from IIITM Kart<h2>
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
				res.send({ response: true , orderId: _id});
			}
		}
	);
};
