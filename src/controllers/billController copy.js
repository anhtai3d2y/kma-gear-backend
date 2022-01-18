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

module.exports = {
    handleGetAllBills: handleGetAllBills,
    handleCreateNewBill: handleCreateNewBill,
    handleEditBill: handleEditBill,
    handleDeleteBill: handleDeleteBill,
}