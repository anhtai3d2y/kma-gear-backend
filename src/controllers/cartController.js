import cartService from "../services/cartService";


let handleGetAllCarts = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            carts: []
        })
    }
    let carts = await cartService.getAllCarts(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        carts
    })
}

let handleCreateNewCart = async (req, res) => {
    let message = await cartService.createNewCart(req.body)
    return res.status(200).json(message)
}

let handleEditCart = async (req, res) => {
    let data = req.body
    let message = await cartService.updateCartData(data)
    return res.status(200).json(message)
}

let handleDeleteCart = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await cartService.deleteCart(req.body.id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllCarts: handleGetAllCarts,
    handleCreateNewCart: handleCreateNewCart,
    handleEditCart: handleEditCart,
    handleDeleteCart: handleDeleteCart,
}