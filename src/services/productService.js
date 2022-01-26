import db from "../models/index";

let getAllProducts = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = ''

            if (productId === 'ALL') {
                products = await db.Products.findAll({
                    where: { deleted: 0 },
                    include: [
                        { model: db.Brands },
                    ],
                    raw: true,
                    nest: true
                })
            }
            if (productId && productId !== 'ALL') {
                products = await db.Products.findOne({
                    where: { id: productId, deleted: 0 },
                    include: [
                        { model: db.Brands },
                    ],
                    raw: true,
                    nest: true
                })
            }
            resolve(products)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllProductsDeleted = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = ''

            if (productId === 'ALL') {
                products = await db.Products.findAll({
                    where: { deleted: 1 },
                    include: [
                        { model: db.Brands },
                    ],
                    order: [['updatedAt', 'DESC']],
                    raw: true,
                    nest: true
                })
            }
            if (productId && productId !== 'ALL') {
                products = await db.Products.findOne({
                    where: { id: productId, deleted: 1 },
                    include: [
                        { model: db.Brands },
                    ],
                    raw: true,
                    nest: true
                })
            }
            resolve(products)
        } catch (error) {
            reject(error)
        }
    })
}

let getTopProductsHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Products.findAll({
                where: { deleted: 0 },
                limit: limit,
                order: [['createdAt', 'DESC']],
                raw: true
            })
            resolve({
                errCode: 0,
                errMessage: 'Ok',
                products: products
            })
        } catch (error) {
            reject(error)
        }
    })
}

let createNewProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Products.create({
                name: data.name,
                brandId: data.brandId,
                typeId: data.typeId,
                amount: data.amount,
                price: data.price,
                discount: data.discount,
                image: data.image,
                shortDescHTML: data.shortDescHTML,
                shortDescMarkdown: data.shortDescMarkdown,
                descriptionHTML: data.descriptionHTML,
                descriptionMarkdown: data.descriptionMarkdown,
                deleted: 0,
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

let bulkUpdateAmountProduct = (data) => {
    // console.log("product: ", data)
    return new Promise(async (resolve, reject) => {
        try {
            let product = await db.Products.bulkCreate(data, {
                updateOnDuplicate: ["amount"]
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

let updateProductData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.typeId || !data.brandId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let product = await db.Products.findOne({
                where: { id: data.id },
                raw: false
            })
            if (product) {
                product.name = data.name
                product.brandId = data.brandId
                product.typeId = data.typeId
                product.amount = data.amount
                product.price = data.price
                product.discount = data.discount
                product.image = data.image,
                    product.shortDescHTML = data.shortDescHTML,
                    product.shortDescMarkdown = data.shortDescMarkdown,
                    product.descriptionHTML = data.descriptionHTML,
                    product.descriptionMarkdown = data.descriptionMarkdown,
                    await product.save()
                resolve({
                    errCode: 0,
                    Message: 'Update product successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Update product failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!productId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let product = await db.Products.findOne({
                where: { id: productId },
                raw: false
            })
            if (product) {
                product.deleted = 1
                await product.save()
                resolve({
                    errCode: 0,
                    Message: 'Delete product successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Delete product failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let recoverProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!productId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let product = await db.Products.findOne({
                where: { id: productId },
                raw: false
            })
            if (product) {
                product.deleted = 0
                await product.save()
                resolve({
                    errCode: 0,
                    Message: 'Recover product successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Recover product failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllProducts: getAllProducts,
    getAllProductsDeleted: getAllProductsDeleted,
    createNewProduct: createNewProduct,
    bulkUpdateAmountProduct: bulkUpdateAmountProduct,
    updateProductData: updateProductData,
    deleteProduct: deleteProduct,
    recoverProduct: recoverProduct,
    getTopProductsHome: getTopProductsHome,
}