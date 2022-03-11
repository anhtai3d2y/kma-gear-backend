import db from "../models/index";
const { Op } = require("sequelize");

let getAllProducts = (ProductId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = ''

            if (ProductId === 'ALL') {
                products = await db.Products.findAll({
                    where: { deleted: 0 },
                    include: [
                        { model: db.Brands },
                    ],
                    order: [['id', 'ASC']],
                    raw: true,
                    nest: true
                })
            }
            if (ProductId && ProductId !== 'ALL') {
                products = await db.Products.findOne({
                    where: { id: ProductId, deleted: 0 },
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

let getProductsByType = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Products.findAll({
                where: {
                    deleted: 0,
                    TypeId: id,
                },
                include: [
                    { model: db.Brands },
                ],
                raw: true,
                nest: true
            })
            resolve(products)
        } catch (error) {
            reject(error)
        }
    })
}

let getProductsByBrand = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Products.findAll({
                where: {
                    deleted: 0,
                    BrandId: id,
                },
                include: [
                    { model: db.Brands },
                ],
                raw: true,
                nest: true
            })
            resolve(products)
        } catch (error) {
            reject(error)
        }
    })
}

let getSearchProducts = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = ''
            let id = Number(key)
            if (!id) {
                id = 0
            }
            products = await db.Products.findAll({
                where: {
                    deleted: 0,
                    // name: {
                    //     [Op.substring]: key,
                    // }
                    [Op.or]: [
                        { id: { [Op.eq]: id, } },
                        { name: { [Op.iLike]: `%${key}%` } },
                        { price: { [Op.lte]: id } },
                        { shortDescMarkdown: { [Op.iLike]: `%${key}%` } },
                    ],
                },
                include: [
                    { model: db.Brands },
                ],
                raw: true,
                nest: true
            })
            resolve(products)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllProductsDeleted = (ProductId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = ''

            if (ProductId === 'ALL') {
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
            if (ProductId && ProductId !== 'ALL') {
                products = await db.Products.findOne({
                    where: { id: ProductId, deleted: 1 },
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

let getTopProductsHome = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let products = await db.Products.findAll({
                where: { deleted: 0 },
                order: [['updatedAt', 'DESC']],
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
                BrandId: data.BrandId,
                TypeId: data.TypeId,
                amount: data.amount,
                price: data.price,
                discount: data.discount,
                image: data.image,
                shortDescHTML: data.shortDescHTML,
                shortDescMarkdown: data.shortDescMarkdown,
                descriptionHTML: data.descriptionHTML,
                descriptionMarkdown: data.descriptionMarkdown,
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
            if (!data.id || !data.TypeId || !data.BrandId) {
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
                product.BrandId = data.BrandId
                product.TypeId = data.TypeId
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

let deleteProduct = (ProductId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!ProductId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let product = await db.Products.findOne({
                where: { id: ProductId },
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

let recoverProduct = (ProductId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!ProductId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let product = await db.Products.findOne({
                where: { id: ProductId },
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
    getProductsByType: getProductsByType,
    getProductsByBrand: getProductsByBrand,
    getAllProductsDeleted: getAllProductsDeleted,
    getSearchProducts: getSearchProducts,
    createNewProduct: createNewProduct,
    bulkUpdateAmountProduct: bulkUpdateAmountProduct,
    updateProductData: updateProductData,
    deleteProduct: deleteProduct,
    recoverProduct: recoverProduct,
    getTopProductsHome: getTopProductsHome,
}