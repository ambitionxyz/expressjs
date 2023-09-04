const Task = require("../model/task")
const apq = require("api-query-params")

const createTask = async(data) => {
    if(data.type == "EMPTY-TASK") {
        let result = await Task.create(data)
        return result
    }
}
const updateTaskService = async(data) => {
    let result = await Task.updateOne({_id: data.id}, {...data})
    return result
}

module.exports = {
    createTask,
    updateTaskService

}