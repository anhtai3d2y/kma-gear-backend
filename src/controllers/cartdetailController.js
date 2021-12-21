import cartdetailService from "../services/cartdetailService";


let handleGetAllCartdetails = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            cartdetails: []
        })
    }
    let cartdetails = await cartdetailService.getAllCartdetails(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        cartdetails
    })
}

let handleCreateNewCartdetail = async (req, res) => {
    let message = await cartdetailService.createNewCartdetail(req.body)
    return res.status(200).json(message)
}

let handleEditCartdetail = async (req, res) => {
    let data = req.body
    let message = await cartdetailService.updateCartdetailData(data)
    return res.status(200).json(message)
}

let handleDeleteCartdetail = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await cartdetailService.deleteCartdetail(req.body.id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllCartdetails: handleGetAllCartdetails,
    handleCreateNewCartdetail: handleCreateNewCartdetail,
    handleEditCartdetail: handleEditCartdetail,
    handleDeleteCartdetail: handleDeleteCartdetail,
}