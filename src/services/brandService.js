import db from "../models/index";
const { Op } = require("sequelize");

let getAllBrands = (BrandId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let brands = ''
            if (BrandId === 'ALL') {
                brands = await db.Brands.findAll({
                    where: { deleted: 0 },
                    order: [['id', 'DESC']],
                    raw: true
                })
            }
            if (BrandId && BrandId !== 'ALL') {
                brands = await db.Brands.findOne({
                    where: { id: BrandId, deleted: 0 },
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
            let id = Number(key)
            if (!id) {
                id = 0
            }
            let brands = await db.Brands.findAll({
                where: {
                    deleted: 0,
                    [Op.or]: [
                        { id: { [Op.eq]: id, } },
                        { name: { [Op.iLike]: `%${key}%`, } },
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

let getAllBrandsDeleted = (BrandId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let brands = ''
            if (BrandId === 'ALL') {
                brands = await db.Brands.findAll({
                    where: { deleted: 1 },
                    order: [['updatedAt', 'DESC']],
                    raw: true
                })
            }
            if (BrandId && BrandId !== 'ALL') {
                brands = await db.Brands.findOne({
                    where: { id: BrandId, deleted: 1 },
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
                deleted: '0'
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

let deleteBrand = (BrandId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!BrandId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let brand = await db.Brands.findOne({
                where: { id: BrandId },
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

let recoverBrand = (BrandId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!BrandId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let brand = await db.Brands.findOne({
                where: { id: BrandId },
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