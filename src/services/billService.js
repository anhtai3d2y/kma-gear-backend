import db from "../models/index";

let getAllBills = (billId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bills = ''
            if (billId === 'ALL') {
                bills = await db.Bills.findAll({
                    include: [
                        { model: db.States },
                        { model: db.Users },
                    ],
                    raw: true,
                    nest: true
                })
            }
            if (billId && billId !== 'ALL') {
                bills = await db.Bills.findOne({
                    where: { id: billId },
                    raw: true
                })
            }
            resolve(bills)
        } catch (error) {
            reject(error)
        }
    })
}

let getBillByPayid = (payId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bills = ''
            bills = await db.Bills.findOne({
                where: { payId: payId },
                raw: true
            })
            resolve(bills)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewBill = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bill = await db.Bills.create({
                userId: data.userId,
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                address: data.address,
                note: data.note,
                stateId: data.stateId,
                paymentTypeId: data.paymentTypeId,
                payId: data.payId,
                totalPrice: data.totalPrice
            })
            resolve({
                errCode: 0,
                errMessage: 'Ok',
                bill
            })
        } catch (error) {
            reject(error)
        }
    })
}

let updateBillData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let bill = await db.Bills.findOne({
                where: { id: data.id },
                raw: false
            })
            if (bill) {
                bill.userId = data.userId
                bill.fullName = data.fullName
                bill.email = data.email
                bill.phoneNumber = data.phoneNumber
                bill.address = data.address
                bill.note = data.note
                bill.stateId = data.stateId
                bill.paymentTypeId = data.paymentTypeId
                await bill.save()
                resolve({
                    errCode: 0,
                    Message: 'Update bill successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Update bill failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteBill = (billId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let bill = await db.Bills.findOne({
                where: { id: billId }
            })
            if (!bill) {
                resolve({
                    errCode: 2,
                    errMessage: `The bill isn't exist!`
                })
            }
            await db.Bills.destroy({
                where: { id: billId }
            })

            resolve({
                errCode: 0,
                errMessage: 'Bill has been delete!'
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllBills: getAllBills,
    getBillByPayid: getBillByPayid,
    createNewBill: createNewBill,
    updateBillData: updateBillData,
    deleteBill: deleteBill,
}