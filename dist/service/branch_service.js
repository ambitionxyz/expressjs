const Branch = require('../model/branch')

const createBranchService = async(branchData) => {
    try{
        let branch = await Branch.create({
            name: branchData.name, 
            display_named : branchData.displayName, 
            code : branchData.code, 
            color : branchData.color , 
            working_time: branchData.working_time
        })
        return branch
    }catch (err) {
        console.log(err);
        return null
    }
}
const updateBranchService = async(data) => {
    let result = await Branch.updateOne({_id: data.id}, {...data})
    return result
}
const deleteBranchService = async(id) => {
    try{
        let result = await Branch.deleteById(id)
        return result
    }catch(err) {
        console.log(err)
        return null
    }
}
module.exports = {
    createBranchService,
    updateBranchService,
    deleteBranchService
    
}
