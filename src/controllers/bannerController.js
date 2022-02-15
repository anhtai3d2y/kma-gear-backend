import bannerService from "../services/bannerService";


let handleGetAllBanners = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            banners: []
        })
    }
    let banners = await bannerService.getAllBanners(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        banners
    })
}

let handleSearchBanners = async (req, res) => {
    let key = req.query.key //ALL, ID
    if (!key) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            banners: []
        })
    }
    let banners = await bannerService.getSearchBanners(key)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        banners
    })
}

let handleGetAllBannersDeleted = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            banners: []
        })
    }
    let banners = await bannerService.getAllBannersDeleted(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        banners
    })
}

let handleGetAllMainBanners = async (req, res) => {
    let banners = await bannerService.getAllMainBanners()
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        banners
    })
}
let handleGetAllSubBanners = async (req, res) => {
    let banners = await bannerService.getAllSubBanners()
    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        banners
    })
}

let handleCreateNewBanner = async (req, res) => {
    let message = await bannerService.createNewBanner(req.body)
    return res.status(200).json(message)
}

let handleEditBanner = async (req, res) => {
    let data = req.body
    let message = await bannerService.updateBannerData(data)
    return res.status(200).json(message)
}

let handleDeleteBanner = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await bannerService.deleteBanner(req.body.id)
    return res.status(200).json(message)
}

let handleRecoverBanner = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await bannerService.recoverBanner(req.body.id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllBanners: handleGetAllBanners,
    handleGetAllBannersDeleted: handleGetAllBannersDeleted,
    handleGetAllMainBanners: handleGetAllMainBanners,
    handleGetAllSubBanners: handleGetAllSubBanners,
    handleSearchBanners: handleSearchBanners,
    handleCreateNewBanner: handleCreateNewBanner,
    handleEditBanner: handleEditBanner,
    handleDeleteBanner: handleDeleteBanner,
    handleRecoverBanner: handleRecoverBanner,
}