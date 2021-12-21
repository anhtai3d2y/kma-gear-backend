import db from "../models/index";

let getAllBanners = (bannerId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let banners = ''
            if (bannerId === 'ALL') {
                banners = await db.Banners.findAll({
                    raw: true
                })
            }
            if (bannerId && bannerId !== 'ALL') {
                banners = await db.Banners.findOne({
                    where: { id: bannerId },
                    raw: true
                })
            }
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
            let banner = await db.Banners.findOne({
                where: { id: bannerId }
            })
            if (!banner) {
                resolve({
                    errCode: 2,
                    errMessage: `The banner isn't exist!`
                })
            }
            await db.Banners.destroy({
                where: { id: bannerId }
            })

            resolve({
                errCode: 0,
                errMessage: 'Banner has been delete!'
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllBanners: getAllBanners,
    createNewBanner: createNewBanner,
    updateBannerData: updateBannerData,
    deleteBanner: deleteBanner,
}