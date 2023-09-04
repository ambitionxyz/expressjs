const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  status: Joi.string(),
  taskType: Joi.string().valid('Common Task', 'Other Task'),
  startDate: Joi.string(),
  endDate: Joi.string(),
});

const validateTask = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = validateTask;
