import db from "../models/index";

let getAllCartdetails = (cartdetailId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cartdetails = ''
            if (cartdetailId === 'ALL') {
                cartdetails = await db.Cartdetails.findAll({
                    raw: true
                })
            }
            if (cartdetailId && cartdetailId !== 'ALL') {
                cartdetails = await db.Cartdetails.findAll({
                    where: { cartId: cartdetailId },
                    include: [
                        { model: db.Products },
                    ],
                    raw: true,
                    nest: true,
                })
            }
            resolve(cartdetails)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewCartdetail = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Cartdetails.create({
                cartId: data.cartId,
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

let updateCartdetailData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let cartdetail = await db.Cartdetails.findOne({
                where: { id: data.id },
                raw: false
            })
            if (cartdetail) {
                cartdetail.cartId = data.cartId
                cartdetail.productId = data.productId
                cartdetail.price = data.price
                cartdetail.amount = data.amount
                cartdetail.discount = data.discount
                await cartdetail.save()
                resolve({
                    errCode: 0,
                    Message: 'Update cartdetail successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Update cartdetail failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteCartdetail = (cartdetailId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cartdetail = await db.Cartdetails.findOne({
                where: { id: cartdetailId }
            })
            if (!cartdetail) {
                resolve({
                    errCode: 2,
                    errMessage: `The cartdetail isn't exist!`
                })
            }
            await db.Cartdetails.destroy({
                where: { id: cartdetailId }
            })

            resolve({
                errCode: 0,
                errMessage: 'Cartdetail has been delete!'
            })

        } catch (error) {
            reject(error)
        }
    })
}

let clearCartdetail = (cartId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cartdetails = await db.Cartdetails.findAll({
                where: { cartId: cartId }
            })
            if (!cartdetails) {
                resolve({
                    errCode: 2,
                    errMessage: `The cartdetail isn't exist!`
                })
            }
            await db.Cartdetails.destroy({
                where: { cartId: cartId }
            })

            resolve({
                errCode: 0,
                errMessage: 'Cartdetail has been clear!'
            })

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllCartdetails: getAllCartdetails,
    createNewCartdetail: createNewCartdetail,
    updateCartdetailData: updateCartdetailData,
    deleteCartdetail: deleteCartdetail,
    clearCartdetail: clearCartdetail,
}