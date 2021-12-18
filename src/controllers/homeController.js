import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.Users.findAll()

        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (error) {
        console.log(error);
    }
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let allUsers = await CRUDService.createNewUser(req.body)
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser()
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDService.getUserById(userId)
        if (userData) {
            return res.render('editCRUD.ejs', {
                userData: userData
            })
        }
    }
    else {
        return res.send('No user is selected!')
    }
}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUsers = await CRUDService.updateUserData(data)
    if (allUsers) {
        return res.render('displayCRUD.ejs', {
            dataTable: allUsers
        })
    }
}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        let allUsers = await CRUDService.deleteUserById(id)
        if (allUsers) {
            return res.render('displayCRUD.ejs', {
                dataTable: allUsers
            })
        }
    } else {
        return res.send('User not found!')
    }
}

module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}