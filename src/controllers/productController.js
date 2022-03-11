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

let handleGetProductsByType = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            products: []
        })
    }
    let products = await productService.getProductsByType(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        products
    })
}

let handleGetProductsByBrand = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            products: []
        })
    }
    let products = await productService.getProductsByBrand(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        products
    })
}

let handleSearchProducts = async (req, res) => {
    let key = req.query.key //ALL, ID
    if (!key) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            products: []
        })
    }
    let products = await productService.getSearchProducts(key)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        products
    })
}

let handleGetAllProductsDeleted = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            products: []
        })
    }
    let products = await productService.getAllProductsDeleted(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        products
    })
}

let handleGetTopProductsHome = async (req, res) => {

    let products = await productService.getTopProductsHome()
    return res.status(200).json(products)

}

let handleCreateNewProduct = async (req, res) => {
    let message = await productService.createNewProduct(req.body)
    return res.status(200).json(message)
}

let handleUpdateAmountProduct = async (req, res) => {
    let message = await productService.bulkUpdateAmountProduct(req.body)
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

let handleRecoverProduct = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await productService.recoverProduct(req.body.id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllProducts: handleGetAllProducts,
    handleGetProductsByType: handleGetProductsByType,
    handleGetProductsByBrand: handleGetProductsByBrand,
    handleGetAllProductsDeleted: handleGetAllProductsDeleted,
    handleSearchProducts: handleSearchProducts,
    handleCreateNewProduct: handleCreateNewProduct,
    handleUpdateAmountProduct: handleUpdateAmountProduct,
    handleEditProduct: handleEditProduct,
    handleDeleteProduct: handleDeleteProduct,
    handleRecoverProduct: handleRecoverProduct,
    handleGetTopProductsHome: handleGetTopProductsHome,
}