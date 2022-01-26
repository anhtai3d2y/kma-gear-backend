import brandService from "../services/brandService";


let handleGetAllBrands = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            brands: []
        })
    }
    let brands = await brandService.getAllBrands(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        brands
    })
}

let handleGetAllBrandsDeleted = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            brands: []
        })
    }
    let brands = await brandService.getAllBrandsDeleted(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        brands
    })
}

let handleCreateNewBrand = async (req, res) => {
    let message = await brandService.createNewBrand(req.body)
    return res.status(200).json(message)
}

let handleEditBrand = async (req, res) => {
    let data = req.body
    let message = await brandService.updateBrandData(data)
    return res.status(200).json(message)
}

let handleDeleteBrand = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await brandService.deleteBrand(req.body.id)
    return res.status(200).json(message)
}

let handleRecoverBrand = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await brandService.recoverBrand(req.body.id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllBrands: handleGetAllBrands,
    handleGetAllBrandsDeleted: handleGetAllBrandsDeleted,
    handleCreateNewBrand: handleCreateNewBrand,
    handleEditBrand: handleEditBrand,
    handleDeleteBrand: handleDeleteBrand,
    handleRecoverBrand: handleRecoverBrand,
}