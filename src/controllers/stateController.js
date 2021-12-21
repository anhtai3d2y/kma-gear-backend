import stateService from "../services/stateService";


let handleGetAllStates = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            states: []
        })
    }
    let states = await stateService.getAllStates(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        states
    })
}

let handleCreateNewState = async (req, res) => {
    let message = await stateService.createNewState(req.body)
    return res.status(200).json(message)
}

let handleEditState = async (req, res) => {
    let data = req.body
    let message = await stateService.updateStateData(data)
    return res.status(200).json(message)
}

let handleDeleteState = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await stateService.deleteState(req.body.id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllStates: handleGetAllStates,
    handleCreateNewState: handleCreateNewState,
    handleEditState: handleEditState,
    handleDeleteState: handleDeleteState,
}