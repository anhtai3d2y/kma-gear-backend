import productService from "../services/productService";


let handleGetAllProducts = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            products: []
        })
    }
    let products = await productService.getAllProducts(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        products
    })
}

let handleGetTopProductsHome = async (req, res) => {
    let limit = Number(req.query.limit)
    if (!limit) limit = 10
    // try {
    let products = await productService.getTopProductsHome(limit)
    return res.status(200).json(products)
    // } catch (error) {
    //     console.log(error);
    //     return res.status(200).json({
    //         errCode: -1,
    //         errMessage: 'Error from server...',
    //     })
    // }
}

let handleCreateNewProduct = async (req, res) => {
    let message = await productService.createNewProduct(req.body)
    return res.status(200).json(message)
}

let handleEditProduct = async (req, res) => {
    let data = req.body
    let message = await productService.updateProductData(data)
    return res.status(200).json(message)
}

let handleDeleteProduct = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await productService.deleteProduct(req.body.id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllProducts: handleGetAllProducts,
    handleCreateNewProduct: handleCreateNewProduct,
    handleEditProduct: handleEditProduct,
    handleDeleteProduct: handleDeleteProduct,
    handleGetTopProductsHome: handleGetTopProductsHome,
}