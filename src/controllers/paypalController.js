import db from "../models/index";
import billService from "../services/billService";

const paypal = require('paypal-rest-sdk');


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.PAYPAL_CLIENT_ID,
    'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

let payWithPaypal = (req, res) => {
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:8080/api/paypal-success",
            "cancel_url": "http://localhost:8080/api/paypal-cancel"
        },
        "transactions": [{
            "item_list": {
                "items": req.body.arrDetails
            },
            "amount": {
                "currency": "USD",
                "total": req.body.totalPrice
            },
            "description": "This is the payment description."
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Ok',
                        paymentId: payment.id,
                        paypalLink: payment.links[i].href
                    })
                }
            }
        }
    });
}

let paypalSuccess = async (req, res) => {
    var payerID = req.query.PayerID
    var paymentId = req.query.paymentId
    let bill = await billService.getBillByPayid(paymentId)
    var execute_payment_json = {
        "payer_id": payerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": bill.totalPrice
            }
        }]
    };
    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            let data = {
                ...bill,
                paymentTypeId: 2
            }
            let message = billService.updateBillData(data)
            // console.log("Get Payment Response");
            // console.log(payment);
            res.redirect('http://localhost:3000/account');
        }
    });
}

let paypalCancel = (req, res) => {

}

module.exports = {
    payWithPaypal: payWithPaypal,
    paypalSuccess: paypalSuccess,
    paypalCancel: paypalCancel
}