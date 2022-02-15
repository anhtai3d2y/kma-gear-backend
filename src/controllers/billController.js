import billService from "../services/billService";


let handleGetAllBills = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            bills: []
        })
    }
    let bills = await billService.getAllBills(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        bills
    })
}

let handleSearchBills = async (req, res) => {
    let key = req.query.key //ALL, ID
    if (!key) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            bills: []
        })
    }
    let bills = await billService.getSearchBills(key)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        bills
    })
}

let handleGetAllBillsDeleted = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            bills: []
        })
    }
    let bills = await billService.getAllBillsDeleted(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        bills
    })
}

let handleGetBillByPayid = async (req, res) => {
    let id = req.query.payId
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            bills: []
        })
    }
    let bills = await billService.getBillByPayid(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        bills
    })
}

let handleCreateNewBill = async (req, res) => {
    let message = await billService.createNewBill(req.body)
    return res.status(200).json(message)
}

let handleEditBill = async (req, res) => {
    let data = req.body
    let message = await billService.updateBillData(data)
    return res.status(200).json(message)
}

let handleDeleteBill = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await billService.deleteBill(req.body.id)
    return res.status(200).json(message)
}

let handleRecoverBill = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await billService.recoverBill(req.body.id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllBills: handleGetAllBills,
    handleGetAllBillsDeleted: handleGetAllBillsDeleted,
    handleGetBillByPayid: handleGetBillByPayid,
    handleSearchBills: handleSearchBills,
    handleCreateNewBill: handleCreateNewBill,
    handleEditBill: handleEditBill,
    handleDeleteBill: handleDeleteBill,
    handleRecoverBill: handleRecoverBill,
}