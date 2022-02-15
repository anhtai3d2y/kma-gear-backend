import categoryService from "../services/categoryService";


let handleGetAllCategorys = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            categorys: []
        })
    }
    let categorys = await categoryService.getAllCategorys(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        categorys
    })
}

let handleSearchCategorys = async (req, res) => {
    let key = req.query.key //ALL, ID
    if (!key) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            categorys: []
        })
    }
    let categorys = await categoryService.getSearchCategorys(key)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        categorys
    })
}

let handleGetAllCategorysDeleted = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            categorys: []
        })
    }
    let categorys = await categoryService.getAllCategorysDeleted(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        categorys
    })
}

let handleCreateNewCategory = async (req, res) => {
    let message = await categoryService.createNewCategory(req.body)
    return res.status(200).json(message)
}

let handleEditCategory = async (req, res) => {
    let data = req.body
    let message = await categoryService.updateCategoryData(data)
    return res.status(200).json(message)
}

let handleDeleteCategory = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await categoryService.deleteCategory(req.body.id)
    return res.status(200).json(message)
}

let handleRecoverCategory = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await categoryService.recoverCategory(req.body.id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllCategorys: handleGetAllCategorys,
    handleGetAllCategorysDeleted: handleGetAllCategorysDeleted,
    handleSearchCategorys: handleSearchCategorys,
    handleCreateNewCategory: handleCreateNewCategory,
    handleEditCategory: handleEditCategory,
    handleDeleteCategory: handleDeleteCategory,
    handleRecoverCategory: handleRecoverCategory,
}