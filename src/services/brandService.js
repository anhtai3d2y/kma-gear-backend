import db from "../models/index";

let getAllBrands = (brandId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let brands = ''
            if (brandId === 'ALL') {
                brands = await db.Brands.findAll({
                    raw: true
                })
            }
            if (brandId && brandId !== 'ALL') {
                brands = await db.Brands.findOne({
                    where: { id: brandId },
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
            let brand = await db.Brands.findOne({
                where: { id: brandId }
            })
            if (!brand) {
                resolve({
                    errCode: 2,
                    errMessage: `The brand isn't exist!`
                })
            }
            await db.Brands.destroy({
                where: { id: brandId }
            })

            resolve({
                errCode: 0,
                errMessage: 'Brand has been delete!'
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllBrands: getAllBrands,
    createNewBrand: createNewBrand,
    updateBrandData: updateBrandData,
    deleteBrand: deleteBrand,
}