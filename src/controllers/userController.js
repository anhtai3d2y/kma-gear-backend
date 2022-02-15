import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password


    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Bạn chưa nhập đầy đủ thông tin !'
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    //check email exist
    //check password
    //return userInfo
    //access_token: JWT

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleCustomerLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password


    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Bạn chưa nhập đầy đủ thông tin !'
        })
    }

    let userData = await userService.handleCustomerLogin(email, password)
    //check email exist
    //check password
    //return userInfo
    //access_token: JWT

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }
    let users = await userService.getAllUsers(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users
    })
}

let handleSearchUsers = async (req, res) => {
    let key = req.query.key //ALL, ID
    if (!key) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }
    let users = await userService.getSearchUsers(key)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users
    })
}

let handleGetAllUsersDeleted = async (req, res) => {
    let id = req.query.id //ALL, ID
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters',
            users: []
        })
    }
    let users = await userService.getAllUsersDeleted(id)

    return res.status(200).json({
        errCode: 0,
        errMessage: 'Ok',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
    let data = req.body
    let message = await userService.updateUserData(data)
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await userService.deleteUser(req.body.id)
    return res.status(200).json(message)
}

let handleRecoverUser = async (req, res) => {
    if (!req.body.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameters!'
        })
    }
    let message = await userService.recoverUser(req.body.id)
    return res.status(200).json(message)
}

module.exports = {
    handleLogin: handleLogin,
    handleCustomerLogin: handleCustomerLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleGetAllUsersDeleted: handleGetAllUsersDeleted,
    handleSearchUsers: handleSearchUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
    handleRecoverUser: handleRecoverUser,
}