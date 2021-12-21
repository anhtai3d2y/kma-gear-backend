import db from "../models/index";

let getAllTypeproducts = (typeproductId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let typeproducts = ''
            if (typeproductId === 'ALL') {
                typeproducts = await db.Typeproducts.findAll({
                    raw: true
                })
            }
            if (typeproductId && typeproductId !== 'ALL') {
                typeproducts = await db.Typeproducts.findOne({
                    where: { id: typeproductId },
                    raw: true
                })
            }
            resolve(typeproducts)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewTypeproduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Typeproducts.create({
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

let updateTypeproductData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let typeproduct = await db.Typeproducts.findOne({
                where: { id: data.id },
                raw: false
            })
            if (typeproduct) {
                typeproduct.typeName = data.typeName
                typeproduct.categoryId = data.categoryId
                await typeproduct.save()
                resolve({
                    errCode: 0,
                    Message: 'Update typeproduct successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Update typeproduct failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteTypeproduct = (typeproductId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let typeproduct = await db.Typeproducts.findOne({
                where: { id: typeproductId }
            })
            if (!typeproduct) {
                resolve({
                    errCode: 2,
                    errMessage: `The typeproduct isn't exist!`
                })
            }
            await db.Typeproducts.destroy({
                where: { id: typeproductId }
            })

            resolve({
                errCode: 0,
                errMessage: 'Typeproduct has been delete!'
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllTypeproducts: getAllTypeproducts,
    createNewTypeproduct: createNewTypeproduct,
    updateTypeproductData: updateTypeproductData,
    deleteTypeproduct: deleteTypeproduct,
}