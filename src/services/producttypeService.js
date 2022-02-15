import db from "../models/index";
const { Op } = require("sequelize");


let getAllProducttypes = (producttypeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let producttypes = ''
            if (producttypeId === 'ALL') {
                producttypes = await db.Producttypes.findAll({
                    include: [
                        { model: db.Categorys },
                    ],
                    where: { deleted: 0 },
                    raw: true,
                    nest: true
                })
            }
            if (producttypeId && producttypeId !== 'ALL') {
                producttypes = await db.Producttypes.findOne({
                    where: { id: producttypeId, deleted: 0 },
                    raw: true
                })
            }
            resolve(producttypes)
        } catch (error) {
            reject(error)
        }
    })
}

let getSearchProducttypes = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            let producttypes = await db.Producttypes.findAll({
                include: [
                    { model: db.Categorys },
                ],
                where: {
                    deleted: 0,
                    [Op.or]: [
                        { id: { [Op.eq]: key, } },
                        { typeName: { [Op.substring]: key, } },
                    ],
                },
                raw: true,
                nest: true
            })
            resolve(producttypes)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllProducttypesDeleted = (producttypeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let producttypes = ''
            if (producttypeId === 'ALL') {
                producttypes = await db.Producttypes.findAll({
                    include: [
                        { model: db.Categorys },
                    ],
                    where: { deleted: 1 },
                    order: [['updatedAt', 'DESC']],
                    raw: true,
                    nest: true
                })
            }
            if (producttypeId && producttypeId !== 'ALL') {
                producttypes = await db.Producttypes.findOne({
                    where: { id: producttypeId, deleted: 1 },
                    raw: true
                })
            }
            resolve(producttypes)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewProducttype = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Producttypes.create({
                typeName: data.typeName,
                categoryId: data.categoryId,
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

let updateProducttypeData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let producttype = await db.Producttypes.findOne({
                where: { id: data.id },
                raw: false
            })
            if (producttype) {
                producttype.typeName = data.typeName
                producttype.categoryId = data.categoryId
                await producttype.save()
                resolve({
                    errCode: 0,
                    Message: 'Update producttype successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Update producttype failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteProducttype = (producttypeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!producttypeId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let producttype = await db.Producttypes.findOne({
                where: { id: producttypeId },
                raw: false
            })
            if (producttype) {
                producttype.deleted = 1
                await producttype.save()
                resolve({
                    errCode: 0,
                    Message: 'Delete product type successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Delete product type failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let recoverProducttype = (producttypeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!producttypeId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let producttype = await db.Producttypes.findOne({
                where: { id: producttypeId },
                raw: false
            })
            if (producttype) {
                producttype.deleted = 0
                await producttype.save()
                resolve({
                    errCode: 0,
                    Message: 'Recover product type successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Recover product type failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getAllProducttypes: getAllProducttypes,
    getAllProducttypesDeleted: getAllProducttypesDeleted,
    getSearchProducttypes: getSearchProducttypes,
    createNewProducttype: createNewProducttype,
    updateProducttypeData: updateProducttypeData,
    deleteProducttype: deleteProducttype,
    recoverProducttype: recoverProducttype,
}