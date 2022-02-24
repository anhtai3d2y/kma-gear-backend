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
                    order: [['createdAt', 'ASC']],
                    raw: true,
                    nest: true
                })
            }
            if (invoicedetailId && invoicedetailId !== 'ALL') {
                invoicedetails = await db.Invoicedetails.findAll({
                    where: { billId: invoicedetailId },
                    raw: true
                })
            }
            resolve(invoicedetails)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllInvoicedetailsByBill = (billId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let invoicedetails = ''
            if (billId) {
                invoicedetails = await db.Invoicedetails.findAll({
                    where: { BillId: billId },
                    include: [
                        { model: db.Products },
                    ],
                    raw: true,
                    nest: true
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
            let invoicedetail = await db.Invoicedetails.findOne({
                order: [['id', 'DESC']],
                raw: true
            })
            await db.Invoicedetails.create({
                id: invoicedetail.id + 1,
                billId: data.billId,
                ProductId: data.ProductId,
                price: data.price,
                amount: data.amount,
                discount: data.discount,
                deleted: '0',
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
                invoicedetail.ProductId = data.ProductId
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
    getAllInvoicedetailsByBill: getAllInvoicedetailsByBill,
    createNewInvoicedetail: createNewInvoicedetail,
    bulkCreateInvoicedetail: bulkCreateInvoicedetail,
    updateInvoicedetailData: updateInvoicedetailData,
    deleteInvoicedetail: deleteInvoicedetail,
}