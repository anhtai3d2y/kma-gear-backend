import db from "../models/index";

let getAllCarts = (cartId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let carts = ''
            if (cartId === 'ALL') {
                carts = await db.Carts.findAll({
                    include: [
                        { model: db.Users },
                    ],
                    raw: true,
                    nest: true
                })
            }
            if (cartId && cartId !== 'ALL') {
                carts = await db.Carts.findOne({
                    where: { id: cartId },
                    raw: true
                })
            }
            resolve(carts)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewCart = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Carts.create({
                userId: data.userId,
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                address: data.address,
                note: data.note,
                paymentTypeId: data.paymentTypeId,
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

let updateCartData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let cart = await db.Carts.findOne({
                where: { id: data.id },
                raw: false
            })
            if (cart) {
                cart.userId = data.userId
                cart.fullName = data.fullName
                cart.email = data.email
                cart.phoneNumber = data.phoneNumber
                cart.address = data.address
                cart.note = data.note
                cart.paymentTypeId = data.paymentTypeId
                await cart.save()
                resolve({
                    errCode: 0,
                    Message: 'Update cart successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Update cart failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteCart = (cartId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cart = await db.Carts.findOne({
                where: { id: cartId }
            })
            if (!cart) {
                resolve({
                    errCode: 2,
                    errMessage: `The cart isn't exist!`
                })
            }
            await db.Carts.destroy({
                where: { id: cartId }
            })

            resolve({
                errCode: 0,
                errMessage: 'Cart has been delete!'
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllCarts: getAllCarts,
    createNewCart: createNewCart,
    updateCartData: updateCartData,
    deleteCart: deleteCart,
}