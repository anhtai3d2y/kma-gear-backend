import db from "../models/index";

let getAllProducttypes = (producttypeId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let producttypes = ''
            if (producttypeId === 'ALL') {
                producttypes = await db.Producttypes.findAll({
                    raw: true
                })
            }
            if (producttypeId && producttypeId !== 'ALL') {
                producttypes = await db.Producttypes.findOne({
                    where: { id: producttypeId },
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
            let producttype = await db.Producttypes.findOne({
                where: { id: producttypeId }
            })
            if (!producttype) {
                resolve({
                    errCode: 2,
                    errMessage: `The producttype isn't exist!`
                })
            }
            await db.Producttypes.destroy({
                where: { id: producttypeId }
            })

            resolve({
                errCode: 0,
                errMessage: 'Producttype has been delete!'
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllProducttypes: getAllProducttypes,
    createNewProducttype: createNewProducttype,
    updateProducttypeData: updateProducttypeData,
    deleteProducttype: deleteProducttype,
}