import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);

            await db.Users.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                fullName: data.fullName,
                phoneNumber: data.phoneNumber,
                address: data.address,
                roleId: data.roleId
            })
            let allUsers = await db.Users.findAll()
            resolve(allUsers)
        } catch (error) {
            reject(error)
        }
    })
}

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

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.Users.findAll({
                raw: true,
            })
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}

let getUserById = (UserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: UserId },
                raw: true,
            })
            if (user) {
                resolve(user)
            } else {
                resolve({})
            }
        } catch (error) {
            reject(error)
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.fullName = data.fullName
                user.address = data.address
                user.phoneNumber = data.phoneNumber
                user.roleId = data.roleId

                await user.save()

                let allUsers = await db.Users.findAll()
                resolve(allUsers)
            } else {
                resolve()
            }
        } catch (error) {
            console.log(error);
        }
    })
}

let deleteUserById = (UserId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.Users.findOne({
                where: { id: UserId }
            })
            if (user) {
                await user.destroy()
                let allUsers = await db.Users.findAll()
                resolve(allUsers)
            } else {
                resolve()
            }
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserById: getUserById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}