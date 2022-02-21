import db from "../models/index";
const { Op } = require("sequelize");

let getAllCategorys = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let categorys = ''
            if (categoryId === 'ALL') {
                categorys = await db.Categorys.findAll({
                    where: { deleted: 0 },
                    order: [['id', 'ASC']],
                    raw: true
                })
            }
            if (categoryId && categoryId !== 'ALL') {
                categorys = await db.Categorys.findOne({
                    where: { id: categoryId, deleted: 0 },
                    raw: true
                })
            }
            resolve(categorys)
        } catch (error) {
            reject(error)
        }
    })
}

let getSearchCategorys = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            // console.log(parseInt(key))
            let id = Number(key)
            if (!id) {
                id = 0
            }
            let categorys = await db.Categorys.findAll({
                where: {
                    deleted: 0,
                    [Op.or]: [
                        { id: { [Op.eq]: id, } },
                        { name: { [Op.substring]: key, } },
                    ],
                },
                raw: true
            })
            resolve(categorys)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllCategorysDeleted = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let categorys = ''
            if (categoryId === 'ALL') {
                categorys = await db.Categorys.findAll({
                    where: { deleted: 1 },
                    order: [['updatedAt', 'ASC']],
                    raw: true
                })
            }
            if (categoryId && categoryId !== 'ALL') {
                categorys = await db.Categorys.findOne({
                    where: { id: categoryId, deleted: 1 },
                    raw: true
                })
            }
            resolve(categorys)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Categorys.create({
                name: data.name,
                image: data.image,
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

let updateCategoryData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let category = await db.Categorys.findOne({
                where: { id: data.id },
                raw: false
            })
            if (category) {
                category.name = data.name
                category.image = data.image
                await category.save()
                resolve({
                    errCode: 0,
                    Message: 'Update category successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Update category failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!categoryId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let category = await db.Categorys.findOne({
                where: { id: categoryId },
                raw: false
            })
            if (category) {
                category.deleted = 1
                await category.save()
                resolve({
                    errCode: 0,
                    Message: 'Delete category successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Delete category failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let recoverCategory = (categoryId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!categoryId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let category = await db.Categorys.findOne({
                where: { id: categoryId },
                raw: false
            })
            if (category) {
                category.deleted = 0
                await category.save()
                resolve({
                    errCode: 0,
                    Message: 'Recover category successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Recover category failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllCategorys: getAllCategorys,
    getAllCategorysDeleted: getAllCategorysDeleted,
    getSearchCategorys: getSearchCategorys,
    createNewCategory: createNewCategory,
    updateCategoryData: updateCategoryData,
    deleteCategory: deleteCategory,
    recoverCategory: recoverCategory,
}