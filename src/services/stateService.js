import db from "../models/index";

let getAllStates = (stateId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let states = ''
            if (stateId === 'ALL') {
                states = await db.States.findAll({
                    raw: true
                })
            }
            if (stateId && stateId !== 'ALL') {
                states = await db.States.findOne({
                    where: { id: stateId },
                    raw: true
                })
            }
            resolve(states)
        } catch (error) {
            reject(error)
        }
    })
}

let createNewState = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.States.create({
                content: data.content,
            })
            resolve({
                errCode: 0,
                errMessage: 'Ok'
            })
        } catch (error) {
            reject(error)
        }
    })
}

let updateStateData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id) {
                resolve({
                    errCode: 2,
                    Message: 'Missing required parameters'
                })
            }
            let state = await db.States.findOne({
                where: { id: data.id },
                raw: false
            })
            if (state) {
                state.content = data.content
                await state.save()
                resolve({
                    errCode: 0,
                    Message: 'Update state successfully'
                })
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'Update state failure'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

let deleteState = (stateId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let state = await db.States.findOne({
                where: { id: stateId }
            })
            if (!state) {
                resolve({
                    errCode: 2,
                    errMessage: `The state isn't exist!`
                })
            }
            await db.States.destroy({
                where: { id: stateId }
            })

            resolve({
                errCode: 0,
                errMessage: 'State has been delete!'
            })

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllStates: getAllStates,
    createNewState: createNewState,
    updateStateData: updateStateData,
    deleteState: deleteState,
}