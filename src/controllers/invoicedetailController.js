import invoicedetailService from "../services/invoicedetailService";


let handleGetAllInvoicedetails = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!',
            invoicedetails: []
        })
    }
    let invoicedetails = await invoicedetailService.getAllInvoicedetails(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        invoicedetails
    })
}

let handleCreateNewInvoicedetail = async (req, res) => {
    let message = await invoicedetailService.createNewInvoicedetail(req.body)
    return res.status(200).json(message)
}

let handleBulkCreateInvoicedetail = async (req, res) => {
    let message = await invoicedetailService.bulkCreateInvoicedetail(req.body)
    return res.status(200).json(message)
}

let handleEditInvoicedetail = async (req, res) => {
    let data = req.body
    let message = await invoicedetailService.updateInvoicedetailData(data)
    return res.status(200).json(message)
}

let handleDeleteInvoicedetail = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await invoicedetailService.deleteInvoicedetail(req.body.id)
    return res.status(200).json(message)
}

module.exports = {
    handleGetAllInvoicedetails: handleGetAllInvoicedetails,
    handleCreateNewInvoicedetail: handleCreateNewInvoicedetail,
    handleBulkCreateInvoicedetail: handleBulkCreateInvoicedetail,
    handleEditInvoicedetail: handleEditInvoicedetail,
    handleDeleteInvoicedetail: handleDeleteInvoicedetail,
}