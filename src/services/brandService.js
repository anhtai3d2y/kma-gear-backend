import db from "../models/index";
const { Op } = require("sequelize");

let getAllBrands = (brandId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let brands = ''
            if (brandId === 'ALL') {
                brands = await db.Brands.findAll({
                    where: { deleted: 0 },
                    raw: true
                })
            }
            if (brandId && brandId !== 'ALL') {
                brands = await db.Brands.findOne({
                    where: { id: brandId, deleted: 0 },
                    raw: true
                })
            }
            resolve(brands)
        } catch (error) {
            reject(error)
        }
    })
}

let getSearchBrands = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            let brands = await db.Brands.findAll({
                where: {
                    deleted: 0,
                    [Op.or]: [
                        { id: { [Op.eq]: key, } },
                        { name: { [Op.substring]: key, } },
                    ],
                },
                raw: true
            })
            resolve(brands)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllBrandsDeleted = (brandId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let brands = ''
            if (brandId === 'ALL') {
                brands = await db.Brands.findAll({
                    where: { deleted: 1 },
                    order: [['updatedAt', 'DESC']],
                    raw: true
                })
            }
            if (brandId && brandId !== 'ALL') {
                brands = await db.Brands.findOne({
                    where: { id: brandId, deleted: 1 },
                    raw: true
                })
            }
            resolve(brands)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewBrand = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Brands.create({
                name: data.name,
                image: data.image,
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

let updateBrandData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let brand = await db.Brands.findOne({
                where: { id: data.id },
                raw: false
            })
            if (brand) {
                brand.name = data.name
                brand.image = data.image
                await brand.save()
                resolve({
                    errCode: 0,
                    Message: 'Update brand successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Update brand failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteBrand = (brandId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!brandId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let brand = await db.Brands.findOne({
                where: { id: brandId },
                raw: false
            })
            if (brand) {
                brand.deleted = 1
                await brand.save()
                resolve({
                    errCode: 0,
                    Message: 'Delete brand successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Delete brand failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let recoverBrand = (brandId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!brandId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let brand = await db.Brands.findOne({
                where: { id: brandId },
                raw: false
            })
            if (brand) {
                brand.deleted = 0
                await brand.save()
                resolve({
                    errCode: 0,
                    Message: 'Recover brand successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Recover brand failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllBrands: getAllBrands,
    getAllBrandsDeleted: getAllBrandsDeleted,
    getSearchBrands: getSearchBrands,
    createNewBrand: createNewBrand,
    updateBrandData: updateBrandData,
    deleteBrand: deleteBrand,
    recoverBrand: recoverBrand,
}