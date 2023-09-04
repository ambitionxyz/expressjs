const Joi = require('joi');

const schema = Joi.object({
  client_name: Joi.string().required(),
  client_code: Joi.number().required(),
  client_address: Joi.string().required()
});

const validateClient = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details.map(detail => detail.message).join(', ');
    return res.status(400).json({ error: errorMessage });
  }

  return next();
};

module.exports = validateClient;
