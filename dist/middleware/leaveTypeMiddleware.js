const Joi = require('joi');

const schema = Joi.object({
  type_name: Joi.string().required(),
  day_off_minus_day: Joi.number().required(),
  type: Joi.boolean()
});

const validateLeaveType = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
}

module.exports = validateLeaveType;
