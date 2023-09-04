const Branch = require("../model/branch")
const Joi = require('joi')
const {createBranchService, updateBranchService, deleteBranchService} = require("../service/branch_service")
const getBranchAPI = async(req, res) => {
    let results = await Branch.find({});
    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}
const createBranchAPI = async(req, res) => {
    let {name, display_name, code, color, working_time} = req.body
    console.log(name, display_name, code, color, working_time)
    let branchData = {
        name, display_name, code, color, working_time
    }
    let branch = await createBranchService(branchData)
    return res.status(200).json(
        {
            EC: 0,
            data: branch
        }
    ) 
}
const updateBranchAPI = async(req, res) => {
    let result = await updateBranchService(req.body)
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}
const deleteBranchAPI= async(req, res) => {
    let id = req.body.id
    console.log(id)
    let result = await deleteBranchService(id)
    return res.status(200).json({
        errorCode: 0,
        data: result
    })

}



module.exports = {
    getBranchAPI,
    createBranchAPI,
    updateBranchAPI,
    deleteBranchAPI
}
