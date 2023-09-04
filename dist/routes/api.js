const express = require('express');
const routerAPI = express.Router();
const {getUsersAPI, postCreateUser, signIn} = require('../controller/apiController');
const {getBranchAPI, createBranchAPI, updateBranchAPI, deleteBranchAPI} = require('../controller/branchController');
const {getLeaveAPI, createLeaveAPI, updateLeaveAPI, deleteLeaveAPI} = require('../controller/leaveController');
const {createTaskAPI, getTaskAPI, updateTaskAPI} = require('../controller/taskController');
const { getClientAPI, createClientAPI, updateClientAPI, deleteClientAPI} = require('../controller/clientController');

const { createProjectAPI, getProjectAPI } = require('../controller/projectController');
const validateSchemaMiddleware = require('../middleware/branchMiddleware');
const validateUser = require('../middleware/userMiddleware');
const validateTask = require('../middleware/taskMiddleware');
const validateLeaveType = require('../middleware/leaveTypeMiddleware');
const validateClient = require('../middleware/clientMiddleware');
const handleSignup = require('../middleware/userMiddleware');
const authJwt = require('../middleware/authJwt');
const verifyTokenLogin = require('../middleware/verifiedToken')
routerAPI.get('/users', getUsersAPI)
routerAPI.post('/users'  , authJwt , handleSignup  ,postCreateUser)
routerAPI.post("/sign-in" ,signIn);

// Branch
routerAPI.get('/get_branch', verifyTokenLogin ,getBranchAPI)
routerAPI.post('/create_branch', validateSchemaMiddleware ,createBranchAPI)
routerAPI.put('/update_branch', updateBranchAPI)
routerAPI.delete('/delete_branch', deleteBranchAPI)

// Leave
routerAPI.get('/get_leave',validateLeaveType ,getLeaveAPI)
routerAPI.post('/create_leave', createLeaveAPI)
routerAPI.put('/update_leave', updateLeaveAPI)
routerAPI.delete('/delete_leave', deleteLeaveAPI)

// Task
routerAPI.post('/create_task', validateTask ,createTaskAPI)
routerAPI.get('/get_task', getTaskAPI)
routerAPI.put('/update_task', updateTaskAPI)
//Client 
routerAPI.get('/get_client', getClientAPI)
routerAPI.post('/create_client', validateClient ,createClientAPI)
routerAPI.put('/update_client', updateClientAPI)
routerAPI.delete('/delete_client', deleteClientAPI)


routerAPI.post('/create_project', createProjectAPI)
routerAPI.get('/get_project', getProjectAPI)


module.exports = routerAPI;
