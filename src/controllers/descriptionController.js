import descriptionService from "../services/descriptionService";


let handleGetAllDescriptions = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            descriptions: []
        })
    }
    let descriptions = await descriptionService.getAllDescriptions(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        descriptions
    })
}

let handleCreateNewDescription = async (req, res) => {
    let message = await descriptionService.createNewDescription(req.body)
    return res.status(200).json(message)
}

let handleEditDescription = async (req, res) => {
    let data = req.body
    let message = await descriptionService.updateDescriptionData(data)
    return res.status(200).json(message)
}

let handleDeleteDescription = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await descriptionService.deleteDescription(req.body.id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllDescriptions: handleGetAllDescriptions,
    handleCreateNewDescription: handleCreateNewDescription,
    handleEditDescription: handleEditDescription,
    handleDeleteDescription: handleDeleteDescription,
}