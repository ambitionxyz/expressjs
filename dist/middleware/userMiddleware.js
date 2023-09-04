const Joi = require('joi');
const User = require('../model/user')


const userSchema = Joi.object({
    type: Joi.string(),
    name: Joi.string().required(),
    status: Joi.number().valid(0, 1, 2).integer().options({ convert: false }),
    address: Joi.string(),
    salary: Joi.number().min(0).integer().options({ convert: false }),
    salary_at: Joi.number().min(0).integer().options({ convert: false }),
    allowed_leave_day: Joi.number().min(0).integer().options({ convert: false }),
    user_code: Joi.number().required().integer().options({ convert: false }),
    sex: Joi.string().valid('Male', 'Female'),
    phone_number: Joi.string().pattern(/^\d{10,11}$/),
    user_level: Joi.string().valid('Inter_0', 'Inter_1', 'Inter_2', 'Inter_3', 'Fresher', 'Junior'),
    working_time: Joi.string(),
    start_day: Joi.date(),
    user_type: Joi.string().valid('Staff', 'Intern', 'Colaborator'),
    is_active: Joi.boolean(),
    branch: Joi.object({
        display_name: Joi.string(),
    }),
    role: Joi.string().valid('Admin', 'User'),
    userName: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string()
});

function validateUser(req, res, next) {
    const { error } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    next();
}
async function handleSignup(req, res, next) {
    try{
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            // if there's a validation error, send a 400 response
            res.status(400).json({ error: error.message });
            return;
        }
      
          // check if a user with the specified email address already exists
        const existingUser = await User.findOne({ email: value.email });
        if (existingUser) {
            // if a user with that email already exists, send a 409 response
            res.status(409).json({ error: 'A user with that email already exists' });
            return;
        }
        next()

    }catch (err) {
    // if there's an error, send a 500 response
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = [validateUser, handleSignup];