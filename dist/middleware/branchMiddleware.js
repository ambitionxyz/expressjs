const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().required(),
  display_name: Joi.string().required(),
  code: Joi.number().integer().options({ convert: false }),
  color: Joi.string().valid('Blue', 'Red', 'Green').required(),
  working_time: Joi.string().regex(/^(\d{2}:\d{2}) - (\d{2}:\d{2}) \((\d+\.\d+)h\)\n(\d{2}:\d{2}) - (\d{2}:\d{2}) \((\d+\.\d+)h\)$/).default(`
    08:30 - 12:00 (3.5h)
    13:00 - 17:30 (4.5h)
  `),
});

const validateSchemaMiddleware = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message).join('; ');
    return res.status(400).json({ error: errorMessage });
  }

  return next();
};

module.exports = validateSchemaMiddleware;
