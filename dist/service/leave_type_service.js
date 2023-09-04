
const Leave_Type = require('../model/leave_type')

const createLeaveType = async(data) => {
    let result = await Leave_Type.create(data)
    return result
}
const updateLeaveType = async(data) => {
    let result = await Leave_Type.updateOne({_id: data.id}, {...data})
    return result
}
const deleteLeaveType = async(id) => {
    try{
        let result = await Leave_Type.deleteById(id)
        return result
    }catch(err) {
        console.log(err)
        return null
    }
}

module.exports = {
    createLeaveType,
    updateLeaveType,
    deleteLeaveType
}