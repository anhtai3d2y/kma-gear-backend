import db from "../models/index";

let getAllProducts = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = ''

            if (productId === 'ALL') {
                products = await db.Products.findAll({
                    include: [
                        { model: db.Brands },
                    ],
                    raw: true,
                    nest: true
                })
            }
            if (productId && productId !== 'ALL') {
                products = await db.Products.findOne({
                    where: { id: productId },
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
                descriptionHTML: data.descriptionHTML,
                descriptionMarkdown: data.descriptionMarkdown,
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
            let product = await db.Products.findOne({
                where: { id: productId }
            })
            if (!product) {
                resolve({
                    errCode: 2,
                    errMessage: `The product isn't exist!`
                })
            }
            await db.Products.destroy({
                where: { id: productId }
            })

            resolve({
                errCode: 0,
                errMessage: 'Product has been delete!'
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllProducts: getAllProducts,
    createNewProduct: createNewProduct,
    updateProductData: updateProductData,
    deleteProduct: deleteProduct,
    getTopProductsHome: getTopProductsHome,
}