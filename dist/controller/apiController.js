const User = require("../model/user")
const {createCustomerService, getUserService} = require("../service/user_service")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {sendError} = require("../utils/helper")
const getUsersAPI = async(req, res) => {
    let results = await getUserService(req.query)
    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}
const postCreateUser = async(req, res) => {
    let result = await createCustomerService(req.body)
    return res.status(200).json({
        EC: 0,
        data: result
    })
}


const signIn = async (req, res,) => {
  const { email, password } = req.body;
  console.log(req.body)
  const user = await User.findOne({ email });
  if (!user) return sendError(res, "Email/Password mismatch!");

  const matched = await user.comparePassword(password);
  if (!matched) return sendError(res, "Email/Password mismatch!");

  const { _id, name, role, userName } = user;
  console.log(user)
  const jwtToken = jwt.sign({ userId: _id , role: role, userName: userName}, process.env.JWT_SECRET, {expiresIn: "10"});

  res.json({
    user: { id: _id, name, email, token: jwtToken, },
  });
}
module.exports = {
    getUsersAPI,
    postCreateUser,
    signIn
}