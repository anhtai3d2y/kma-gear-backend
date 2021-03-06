import db from "../models/index";
import bcrypt from 'bcryptjs';
const { Op } = require("sequelize");


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
                    where: { email: email, roleId: '0' },
                    attributes: ['email', 'password', 'fullName'],
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
                        userData.errMessage = `Sai mật khẩu !`
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = `Tài khoản không tồn tại`
                }
            } else {
                //return error
                userData.errCode = 1
                userData.errMessage = `Tài khoản của bạn không tồn tại !`
            }
            resolve(userData)

        } catch (error) {
            reject(error)
        }
    })
}

let handleCustomerLogin = (email, password) => {

    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if (isExist) {
                //user already exist
                //compare password
                let user = await db.Users.findOne({
                    where: { email: email, roleId: '1' },
                    attributes: ['id', 'email', 'password', 'fullName', 'phoneNumber', 'address'],
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
                        userData.errMessage = `Sai mật khẩu !`
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = `Tài khoản không tồn tại`
                }
            } else {
                //return error
                userData.errCode = 1
                userData.errMessage = `Tài khoản của bạn không tồn tại !`
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

let getAllUsers = (UserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (UserId === 'ALL') {
                users = await db.Users.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    where: { roleId: '1', deleted: 0 },
                    order: [['id', 'DESC']],
                    raw: true
                })
            }
            if (UserId && UserId !== 'ALL') {
                users = await db.Users.findOne({
                    where: { id: UserId, deleted: 0 },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Carts },
                        { model: db.Bills },
                    ],
                    raw: true,
                    nest: true
                })
            }
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let getSearchUsers = (key) => {
    return new Promise(async (resolve, reject) => {
        try {
            let id = Number(key)
            if (!id) {
                id = 0
            }
            let users = await db.Users.findAll({
                attributes: {
                    exclude: ['password']
                },
                where: {
                    roleId: '1',
                    deleted: 0,
                    [Op.or]: [
                        { id: { [Op.eq]: id, } },
                        { email: { [Op.iLike]: `%${key}%`, } },
                        { fullName: { [Op.iLike]: `%${key}%`, } },
                        { phoneNumber: { [Op.iLike]: `%${key}%`, } },
                        { address: { [Op.iLike]: `%${key}%`, } },
                    ],
                },
                raw: true
            })
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let getAllUsersDeleted = (UserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = ''
            if (UserId === 'ALL') {
                users = await db.Users.findAll({
                    attributes: {
                        exclude: ['password']
                    },
                    where: { roleId: '1', deleted: 1 },
                    order: [['updatedAt', 'DESC']],
                    raw: true
                })
            }
            if (UserId && UserId !== 'ALL') {
                users = await db.Users.findOne({
                    where: { id: UserId, deleted: 1 },
                    attributes: {
                        exclude: ['password']
                    },
                    include: [
                        { model: db.Carts },
                        { model: db.Bills },
                    ],
                    raw: true,
                    nest: true
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
                    roleId: '1',
                    deleted: '0'
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

let updateUserPassword = (data) => {
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
                let check = await bcrypt.compareSync(data.password, user.password);
                if (check) {
                    let hashPasswordFromBcrypt = await hashUserPassword(data.newPassword);
                    user.password = hashPasswordFromBcrypt
                    await user.save()

                    resolve({
                        errCode: 0,
                        Message: 'Update password successfully!'
                    })
                } else {
                    resolve({
                        errCode: 1,
                        errMessage: 'Update password failure, wrong password!'
                    })
                }
            } else {
                resolve({
                    errCode: 2,
                    errMessage: 'Update password failure!'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteUser = (UserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!UserId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let user = await db.Users.findOne({
                where: { id: UserId },
                raw: false
            })
            if (user) {
                user.deleted = 1
                await user.save()
                resolve({
                    errCode: 0,
                    Message: 'Delete user successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Delete user failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let recoverUser = (UserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!UserId) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let user = await db.Users.findOne({
                where: { id: UserId },
                raw: false
            })
            if (user) {
                user.deleted = 0
                await user.save()
                resolve({
                    errCode: 0,
                    Message: 'Recover user successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Recover user failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    handleCustomerLogin: handleCustomerLogin,
    checkUserEmail: checkUserEmail,
    getAllUsers: getAllUsers,
    getAllUsersDeleted: getAllUsersDeleted,
    getSearchUsers: getSearchUsers,
    createNewUser: createNewUser,
    updateUserPassword: updateUserPassword,
    updateUserData: updateUserData,
    deleteUser: deleteUser,
    recoverUser: recoverUser,
}