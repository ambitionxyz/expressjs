const Project = require("../model/project")

const apq = require('api-query-params')

const createProject = async(data) => {
    if(data.type === "EMPTY-PROJECT") {
        let result = await Project.create(data)
        return result
    }
    if(data.type === "ADD-CLIENT") {
        let myProject = await Project.findById(data.projectId).exec()
        
        for(let i = 0; i < data.clientsArr.length; i++) {
            myProject.client.push(data.clientsArr[i])
        }
        let Newresult = await myProject.save()
        return Newresult
    }

    if(data.type === "ADD-USERS") {
        
        let myProject = await Project.findById(data.projectId).exec()
        const newUsers = [];
        for(let i = 0; i < data.usersArr.length; i++) {
            const user = data.usersArr[i];
            if (!myProject.user.includes(user)) {
                newUsers.push(user);
            }
        }
        if (newUsers.length === 0) {
            // If all tasks already exist in the project, return the current project
            return myProject;
        }
        myProject.task.push(...newUsers);
        const newResult = await myProject.save();
        return newResult;
    }
    if(data.type === 'REMOVE-USERS') {

        let myProject = await Project.findById(data.projectId).exec()
        for(let i = 0; i < data.usersArr.length; i++) {
            myProject.user.pull(data.usersArr[i])
        }
        
        let Newresult = await myProject.save()
        return Newresult
    }
    if (data.type === 'ADD-TASKS') { 
        let myProject = await Project.findById(data.projectId).exec()
        // for(let i = 0; i < data.tasksArr.length; i++) {
        //     console.log(data.tasksArr[i])
        //     console.log(myProject.task)
        //     myProject.task.push(data.tasksArr[i])
        // }
        // let Newresult = await myProject.save()
        // return Newresult
        const newTasks = [];
        for (let i = 0; i < data.tasksArr.length; i++) {
            const task = data.tasksArr[i];
            if (!myProject.task.includes(task)) {
                newTasks.push(task);
            }
        }
        if (newTasks.length === 0) {
            // If all tasks already exist in the project, return the current project
            return myProject;
        }
        myProject.task.push(...newTasks);
        const newResult = await myProject.save();
        return newResult;

    } 
    return null
}
const getProject = async(queryString) => {
    const page = queryString.page
    const {filter, limit, population} = apq(queryString)
    delete filter.page
    let offset = (page - 1) * limit
    result = await Project.find(filter).populate(population).skip(offset).limit(limit).exec()
    return result
}

module.exports = {
    createProject,
    getProject
}