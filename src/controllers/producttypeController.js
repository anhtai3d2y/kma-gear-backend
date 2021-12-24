import producttypeService from "../services/producttypeService";


let handleGetAllProducttypes = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            producttypes: []
        })
    }
    let producttypes = await producttypeService.getAllProducttypes(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        producttypes
    })
}

let handleCreateNewProducttype = async (req, res) => {
    let message = await producttypeService.createNewProducttype(req.body)
    return res.status(200).json(message)
}

let handleEditProducttype = async (req, res) => {
    let data = req.body
    let message = await producttypeService.updateProducttypeData(data)
    return res.status(200).json(message)
}

let handleDeleteProducttype = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await producttypeService.deleteProducttype(req.body.id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllProducttypes: handleGetAllProducttypes,
    handleCreateNewProducttype: handleCreateNewProducttype,
    handleEditProducttype: handleEditProducttype,
    handleDeleteProducttype: handleDeleteProducttype,
}