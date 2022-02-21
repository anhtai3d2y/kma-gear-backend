import db from "../models/index";

let getAllCarts = (CartId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let carts = ''
            if (CartId === 'ALL') {
                carts = await db.Carts.findAll({
                    include: [
                        { model: db.Users },
                    ],
                    raw: true,
                    nest: true
                })
            }
            if (CartId && CartId !== 'ALL') {
                carts = await db.Carts.findOne({
                    where: { UserId: CartId },
                    raw: true
                })
                if (carts === null) {
                    let user = await db.Users.findOne({
                        where: { id: CartId, roleId: '1' },
                        attributes: {
                            exclude: ['password']
                        },
                        raw: true,
                        nest: true
                    })
                    if (user !== null) {
                        await db.Carts.create({
                            UserId: user.id,
                            fullName: user.fullName,
                            email: user.email,
                            phoneNumber: user.phoneNumber,
                            address: user.address,
                            PaymenttypeId: 1,
                        })
                    }
                    carts = await db.Carts.findOne({
                        where: { UserId: CartId },
                        raw: true
                    })
                }
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
                UserId: data.UserId,
                fullName: data.fullName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                address: data.address,
                note: data.note,
                PaymenttypeId: data.PaymenttypeId,
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
                cart.UserId = data.UserId
                cart.fullName = data.fullName
                cart.email = data.email
                cart.phoneNumber = data.phoneNumber
                cart.address = data.address
                cart.note = data.note
                cart.PaymenttypeId = data.PaymenttypeId
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

let deleteCart = (CartId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let cart = await db.Carts.findOne({
                where: { id: CartId }
            })
            if (!cart) {
                resolve({
                    errCode: 2,
                    errMessage: `The cart isn't exist!`
                })
            }
            await db.Carts.destroy({
                where: { id: CartId }
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