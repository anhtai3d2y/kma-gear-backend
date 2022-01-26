import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import bannerController from "../controllers/bannerController";
import billController from "../controllers/billController";
import stateController from "../controllers/stateController";
import cartController from "../controllers/cartController";
import categoryController from "../controllers/categoryController";
import brandController from "../controllers/brandController";
import producttypeController from "../controllers/producttypeController";
import descriptionController from "../controllers/descriptionController";
import productController from "../controllers/productController";
import invoicedetailController from "../controllers/invoicedetailController";
import cartdetailController from "../controllers/cartdetailController";
import paypalController from "../controllers/paypalController";
let router = express.Router()

let initWebRoutes = (app) => {

    router.get('/', homeController.getHomePage)
    router.get('/crud', homeController.getCRUD)


    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.displayGetCRUD)

    router.get('/edit-crud', homeController.getEditCRUD)
    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)

    //user routes
    router.post('/api/login', userController.handleLogin)
    router.post('/api/customer-login', userController.handleCustomerLogin)
    router.get('/api/get-all-users', userController.handleGetAllUsers)
    router.get('/api/get-all-users-deleted', userController.handleGetAllUsersDeleted)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)
    router.delete('/api/recover-user', userController.handleRecoverUser)


    //banner routes
    router.get('/api/get-all-banners', bannerController.handleGetAllBanners)
    router.get('/api/get-all-main-banners', bannerController.handleGetAllMainBanners)
    router.get('/api/get-all-sub-banners', bannerController.handleGetAllSubBanners)
    router.post('/api/create-new-banner', bannerController.handleCreateNewBanner)
    router.put('/api/edit-banner', bannerController.handleEditBanner)
    router.delete('/api/delete-banner', bannerController.handleDeleteBanner)

    //bill routes
    router.get('/api/get-all-bills', billController.handleGetAllBills)
    router.get('/api/get-bill-by-payid', billController.handleGetBillByPayid)
    router.post('/api/create-new-bill', billController.handleCreateNewBill)
    router.put('/api/edit-bill', billController.handleEditBill)
    router.delete('/api/delete-bill', billController.handleDeleteBill)

    //state routes
    router.get('/api/get-all-states', stateController.handleGetAllStates)
    router.post('/api/create-new-state', stateController.handleCreateNewState)
    router.put('/api/edit-state', stateController.handleEditState)
    router.delete('/api/delete-state', stateController.handleDeleteState)

    //cart routes
    router.get('/api/get-all-carts', cartController.handleGetAllCarts)
    router.post('/api/create-new-cart', cartController.handleCreateNewCart)
    router.put('/api/edit-cart', cartController.handleEditCart)
    router.delete('/api/delete-cart', cartController.handleDeleteCart)

    //category routes
    router.get('/api/get-all-categorys', categoryController.handleGetAllCategorys)
    router.get('/api/get-all-categorys-deleted', categoryController.handleGetAllCategorysDeleted)
    router.post('/api/create-new-category', categoryController.handleCreateNewCategory)
    router.put('/api/edit-category', categoryController.handleEditCategory)
    router.delete('/api/delete-category', categoryController.handleDeleteCategory)
    router.delete('/api/recover-category', categoryController.handleRecoverCategory)


    //brand routes
    router.get('/api/get-all-brands', brandController.handleGetAllBrands)
    router.post('/api/create-new-brand', brandController.handleCreateNewBrand)
    router.put('/api/edit-brand', brandController.handleEditBrand)
    router.delete('/api/delete-brand', brandController.handleDeleteBrand)

    //producttype routes
    router.get('/api/get-all-producttypes', producttypeController.handleGetAllProducttypes)
    router.post('/api/create-new-producttype', producttypeController.handleCreateNewProducttype)
    router.put('/api/edit-producttype', producttypeController.handleEditProducttype)
    router.delete('/api/delete-producttype', producttypeController.handleDeleteProducttype)
    router.delete('/api/recover-producttype', producttypeController.handleRecoverProducttype)


    //description routes
    router.get('/api/get-all-descriptions', descriptionController.handleGetAllDescriptions)
    router.post('/api/create-new-description', descriptionController.handleCreateNewDescription)
    router.put('/api/edit-description', descriptionController.handleEditDescription)
    router.delete('/api/delete-description', descriptionController.handleDeleteDescription)

    //product routes
    router.get('/api/get-all-products', productController.handleGetAllProducts)
    router.get('/api/get-all-products-deleted', productController.handleGetAllProductsDeleted)
    router.get('/api/get-top-products-home', productController.handleGetTopProductsHome)
    router.post('/api/create-new-product', productController.handleCreateNewProduct)
    router.post('/api/bulk-update-amount-product', productController.handleUpdateAmountProduct)
    router.put('/api/edit-product', productController.handleEditProduct)
    router.delete('/api/delete-product', productController.handleDeleteProduct)
    router.delete('/api/recover-product', productController.handleRecoverProduct)

    //invoicedetail routes
    router.get('/api/get-all-invoicedetails', invoicedetailController.handleGetAllInvoicedetails)
    router.post('/api/create-new-invoicedetail', invoicedetailController.handleCreateNewInvoicedetail)
    router.put('/api/edit-invoicedetail', invoicedetailController.handleEditInvoicedetail)
    router.delete('/api/delete-invoicedetail', invoicedetailController.handleDeleteInvoicedetail)
    router.post('/api/bulk-create-invoicedetail', invoicedetailController.handleBulkCreateInvoicedetail)


    //cartdetail routes
    router.get('/api/get-all-cartdetails', cartdetailController.handleGetAllCartdetails)
    router.post('/api/create-new-cartdetail', cartdetailController.handleCreateNewCartdetail)
    router.put('/api/edit-cartdetail', cartdetailController.handleEditCartdetail)
    router.delete('/api/delete-cartdetail', cartdetailController.handleDeleteCartdetail)
    router.delete('/api/clear-cartdetail', cartdetailController.handleClearCartdetail)

    //paypal
    router.post('/api/paypal', paypalController.payWithPaypal)
    router.get('/api/paypal-success', paypalController.paypalSuccess)
    router.get('/api/paypal-cancel', paypalController.paypalCancel)

    return app.use("/", router)
}

module.exports = initWebRoutes