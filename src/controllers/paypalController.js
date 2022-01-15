import cartdetailService from "../services/cartdetailService";
const paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AeW1yFwajTaiDGXbasMaW7TzaNJiGwMPsNHXI7TAVspBpjwocg4z4lNaLtkXNMSuAnlVmT081miMrRBm',
    'client_secret': 'EHugYMrVgLbSRDywiotgb08QZyAyfDPX7yvDRVdtmMOmjUFkSM0m_FQOioYo2hCqV2aIviAWWaNLAeKB'
});

var items = [
    {
        "name": "RTX 3090ti",
        "sku": "1",
        "price": "1.00",
        "currency": "USD",
        "quantity": 1
    },
    {
        "name": "Bàn phím logitech",
        "sku": "2",
        "price": "1.00",
        "currency": "USD",
        "quantity": 1
    },
    {
        "name": "Chuột gaming",
        "sku": "3",
        "price": "1.00",
        "currency": "USD",
        "quantity": 2
    },
    {
        "name": "i9 12000k",
        "sku": "4",
        "price": "1.00",
        "currency": "USD",
        "quantity": 1
    }
]

var total = 0

let payWithPaypal = (req, res) => {
    for (let i = 0; i < items.length; i++) {
        total += parseFloat(items[i].price) * items[i].quantity
    }
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
                "items": items
            },
            "amount": {
                "currency": "USD",
                "total": total.toString()
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

let paypalSuccess = (req, res) => {

    var payerID = req.query.PayerID

    var execute_payment_json = {
        "payer_id": payerID,
        "transactions": [{
            "amount": {
                "currency": "USD",
                "total": total.toString()
            }
        }]
    };

    var paymentId = req.query.paymentId;

    paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log("Get Payment Response");
            console.log(payment.id);

            console.log('list items: ', items, 'total price', total)
            res.send('Thanh toán thành công');

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