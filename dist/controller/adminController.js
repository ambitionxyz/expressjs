const jwt = require('jsonwebtoken')
const Admin = require('../model/admin')
const {createAdmin} = require("../service/admin_service")


exports.signIn = async (req, res,) => {
    const { email, password } = req.body;
  
    const user = await Admin.findOne({ email });
  
    const matched = await user.comparePassword(password);
  
    const { _id, name } = user;
  
    const jwtToken = jwt.sign({ userId: _id }, process.env.JWT_SECRET);
  
    res.json({
      user: { id: _id, name, email, token: jwtToken, },
    });
};
exports.createAdmintAPI = async(req, res) => {
    let result = await createAdmin(req.body)
    return res.status(200).json({
        errorCode: 0,
        data: result
    })
}

