import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (error) {
            reject(error)
        }
    })
}

let handleUserLogin = (email, password) => {

    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}

            let isExist = await checkUserEmail(email)
            if (isExist) {
                //user already exist
                //compare password
                let user = await db.Users.findOne({
                    where: { email: email, roleId: 0 },
                    attributes: ['email', 'roleId', 'password', 'fullName'],
                    raw: true,
                })
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = `Ok`
                        delete user.password
                        userData.user = user
                    } else {
                        userData.errCode = 3
                        userData.errMessage = `Wrong password`
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = `User isn't exist`
                }
            } else {
                //return error
                userData.errCode = 1
                userData.errMessage = `Your email isn't exist. Pls try other email`
            }
            resolve(userData)

        } catch (error) {
            reject(error)
        }
    })
}

let checkUserEmail = (userEmail) => {

    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { email: userEmail },
                raw: true,
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }

        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (userId === 'ALL') {
                users = await db.Users.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    where: { roleId: 1 },
                    raw: true
                })
            }
            if (userId && userId !== 'ALL') {
                users = await db.Users.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    },
                    raw: true
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewUser = (data) => {

    return new Promise(async (resolve, reject) => {
        try {

            //Check email exist

            let check = await checkUserEmail(data.email)
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email already used. Please try another email'
                })
            } else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);

                await db.Users.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    fullName: data.fullName,
                    phoneNumber: data.phoneNumber,
                    address: data.address,
                    roleId: 1
                })
                resolve({
                    errCode: 0,
                    errMessage: 'Ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let user = await db.Users.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.fullName = data.fullName
                user.address = data.address
                user.phoneNumber = data.phoneNumber
                await user.save()

                resolve({
                    errCode: 0,
                    Message: 'Update user successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Update user failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist!`
                })
            }
            await db.Users.destroy({
                where: { id: userId }
            })

            resolve({
                errCode: 0,
                errMessage: 'User has been delete!'
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    updateUserData: updateUserData,
    deleteUser: deleteUser,
}