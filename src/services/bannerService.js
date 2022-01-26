import db from "../models/index";

let getAllBanners = (bannerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let banners = ''
            if (bannerId === 'ALL') {
                banners = await db.Banners.findAll({
                    where: { deleted: 0 },
                    raw: true
                })
            }
            if (bannerId && bannerId !== 'ALL') {
                banners = await db.Banners.findOne({
                    where: { id: bannerId, deleted: 0 },
                    raw: true
                })
            }
            resolve(banners)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllBannersDeleted = (bannerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let banners = ''
            if (bannerId === 'ALL') {
                banners = await db.Banners.findAll({
                    where: { deleted: 1 },
                    order: [['updatedAt', 'DESC']],
                    raw: true
                })
            }
            if (bannerId && bannerId !== 'ALL') {
                banners = await db.Banners.findOne({
                    where: { id: bannerId, deleted: 1 },
                    raw: true
                })
            }
            resolve(banners)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllMainBanners = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let banners = await db.Banners.findAll({
                where: { type: 0 },
                raw: true
            })
            resolve(banners)
        } catch (error) {
            reject(error)
        }
    })
}
let getAllSubBanners = (bannerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let banners = await db.Banners.findAll({
                where: { type: 1 },
                raw: true
            })
            resolve(banners)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewBanner = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Banners.create({
                link: data.link,
                image: data.image,
                type: data.type,
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

let updateBannerData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let banner = await db.Banners.findOne({
                where: { id: data.id },
                raw: false
            })
            if (banner) {
                banner.link = data.link
                banner.image = data.image
                banner.type = data.type
                await banner.save()
                resolve({
                    errCode: 0,
                    Message: 'Update banner successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Update banner failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteBanner = (bannerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!bannerId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let banner = await db.Banners.findOne({
                where: { id: bannerId },
                raw: false
            })
            if (banner) {
                banner.deleted = 1
                await banner.save()
                resolve({
                    errCode: 0,
                    Message: 'Delete banner successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Delete banner failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let recoverBanner = (bannerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!bannerId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let banner = await db.Banners.findOne({
                where: { id: bannerId },
                raw: false
            })
            if (banner) {
                banner.deleted = 0
                await banner.save()
                resolve({
                    errCode: 0,
                    Message: 'Recover banner successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Recover banner failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllBanners: getAllBanners,
    getAllBannersDeleted: getAllBannersDeleted,
    getAllMainBanners: getAllMainBanners,
    getAllSubBanners: getAllSubBanners,
    createNewBanner: createNewBanner,
    updateBannerData: updateBannerData,
    deleteBanner: deleteBanner,
    recoverBanner: recoverBanner,
}