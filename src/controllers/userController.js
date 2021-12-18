import userService from "../services/userService";

let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password


    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing input parameter!'
        })
    }

    let userData = await userService.handleUserLogin(email, password)
    //check email exist
    //check password
    //return userInfor
    //access_token: JWT

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

module.exports = {
    handleLogin: handleLogin,
}