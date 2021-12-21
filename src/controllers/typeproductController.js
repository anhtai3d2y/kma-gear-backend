import typeproductService from "../services/typeproductService";


let handleGetAllTypeproducts = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            typeproducts: []
        })
    }
    let typeproducts = await typeproductService.getAllTypeproducts(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        typeproducts
    })
}

let handleCreateNewTypeproduct = async (req, res) => {
    let message = await typeproductService.createNewTypeproduct(req.body)
    return res.status(200).json(message)
}

let handleEditTypeproduct = async (req, res) => {
    let data = req.body
    let message = await typeproductService.updateTypeproductData(data)
    return res.status(200).json(message)
}

let handleDeleteTypeproduct = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await typeproductService.deleteTypeproduct(req.body.id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllTypeproducts: handleGetAllTypeproducts,
    handleCreateNewTypeproduct: handleCreateNewTypeproduct,
    handleEditTypeproduct: handleEditTypeproduct,
    handleDeleteTypeproduct: handleDeleteTypeproduct,
}