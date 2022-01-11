import cartdetailService from "../services/cartdetailService";
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AeW1yFwajTaiDGXbasMaW7TzaNJiGwMPsNHXI7TAVspBpjwocg4z4lNaLtkXNMSuAnlVmT081miMrRBm',
    'client_secret': 'EHugYMrVgLbSRDywiotgb08QZyAyfDPX7yvDRVdtmMOmjUFkSM0m_FQOioYo2hCqV2aIviAWWaNLAeKB'
});

let payWithPaypal = (req, res) => {
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/account",
            "cancel_url": "http://localhost:3000/home"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "RTX 3090ti",
                    "sku": "001",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    // res.redirect(payment.links[i].href)
                    return res.status(200).json({
                        errCode: 0,
                        errMessage: 'Ok',
                        paypalLink: payment.links[i].href
                    })
                }
            }
        }
    });
}

module.exports = {
    payWithPaypal: payWithPaypal,
}