import db from "../models/index";

let getAllInvoicedetails = (invoicedetailId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let invoicedetails = ''
            if (invoicedetailId === 'ALL') {
                invoicedetails = await db.Invoicedetails.findAll({
                    include: [
                        { model: db.Products },
                    ],
                    raw: true,
                    nest: true
                })
            }
            if (invoicedetailId && invoicedetailId !== 'ALL') {
                invoicedetails = await db.Invoicedetails.findOne({
                    where: { id: invoicedetailId },
                    raw: true
                })
            }
            resolve(invoicedetails)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewInvoicedetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Invoicedetails.create({
                billId: data.billId,
                productId: data.productId,
                price: data.price,
                amount: data.amount,
                discount: data.discount,
            })
            resolve({
                errCode: 0,
                errMessage: 'Ok'
            })
        } catch (error) {
            reject(error)
        }
    })
}

let bulkCreateInvoicedetail = (data) => {
    console.log('invoicedetail: ', data)
    return new Promise(async (resolve, reject) => {
        try {
            await db.Invoicedetails.bulkCreate(data)
            resolve({
                errCode: 0,
                errMessage: 'Ok'
            })
        } catch (error) {
            reject(error)
        }
    })
}

let updateInvoicedetailData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let invoicedetail = await db.Invoicedetails.findOne({
                where: { id: data.id },
                raw: false
            })
            if (invoicedetail) {
                invoicedetail.billId = data.billId
                invoicedetail.productId = data.productId
                invoicedetail.price = data.price
                invoicedetail.amount = data.amount
                invoicedetail.discount = data.discount
                await invoicedetail.save()
                resolve({
                    errCode: 0,
                    Message: 'Update invoicedetail successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Update invoicedetail failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteInvoicedetail = (invoicedetailId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let invoicedetail = await db.Invoicedetails.findOne({
                where: { id: invoicedetailId }
            })
            if (!invoicedetail) {
                resolve({
                    errCode: 2,
                    errMessage: `The invoicedetail isn't exist!`
                })
            }
            await db.Invoicedetails.destroy({
                where: { id: invoicedetailId }
            })

            resolve({
                errCode: 0,
                errMessage: 'Invoicedetail has been delete!'
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllInvoicedetails: getAllInvoicedetails,
    createNewInvoicedetail: createNewInvoicedetail,
    bulkCreateInvoicedetail: bulkCreateInvoicedetail,
    updateInvoicedetailData: updateInvoicedetailData,
    deleteInvoicedetail: deleteInvoicedetail,
}