const Leave_Type = require("../model/leave_type")
const {createLeaveType, updateLeaveType, deleteLeaveType} = require("../service/leave_type_service")
const getLeaveAPI = async(req, res) => {
    let results = await Leave_Type.find({})
    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}
const createLeaveAPI = async(req, res) => {
    let {type_name, day_off_minus_day} = req.body
    console.log(type_name, day_off_minus_day)
    let result = await createLeaveType(req.body)
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}
const updateLeaveAPI = async(req, res) => {
    let result = await updateLeaveType(req.body)
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}
const deleteLeaveAPI= async(req, res) => {
    let id = req.body.id
    console.log(id)
    let result = await deleteLeaveType(id)
    return res.status(200).json({
        errorCode: 0,
        data: result
    })

}

module.exports = {
    getLeaveAPI,
    createLeaveAPI,
    updateLeaveAPI,
    deleteLeaveAPI
}
