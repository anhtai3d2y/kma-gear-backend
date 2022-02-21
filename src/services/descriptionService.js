import db from "../models/index";

let getAllDescriptions = (descriptionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let descriptions = ''
            if (descriptionId === 'ALL') {
                descriptions = await db.Descriptions.findAll({
                    raw: true
                })
            }
            if (descriptionId && descriptionId !== 'ALL') {
                descriptions = await db.Descriptions.findOne({
                    where: { id: descriptionId },
                    raw: true
                })
            }
            resolve(descriptions)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewDescription = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Descriptions.create({
                ProductId: data.ProductId,
                content: data.content,
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

let updateDescriptionData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let description = await db.Descriptions.findOne({
                where: { id: data.id },
                raw: false
            })
            if (description) {
                description.ProductId = data.ProductId
                description.content = data.content
                await description.save()
                resolve({
                    errCode: 0,
                    Message: 'Update description successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Update description failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteDescription = (descriptionId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let description = await db.Descriptions.findOne({
                where: { id: descriptionId }
            })
            if (!description) {
                resolve({
                    errCode: 2,
                    errMessage: `The description isn't exist!`
                })
            }
            await db.Descriptions.destroy({
                where: { id: descriptionId }
            })

            resolve({
                errCode: 0,
                errMessage: 'Description has been delete!'
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllDescriptions: getAllDescriptions,
    createNewDescription: createNewDescription,
    updateDescriptionData: updateDescriptionData,
    deleteDescription: deleteDescription,
}