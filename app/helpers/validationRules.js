const Joi = require('@hapi/joi')

const validationRules = {
    title: Joi.string().required().trim().min(3),
    isCompleted: Joi.string().trim().min(3).valid("true", "false"),
    description: Joi.string().required().trim().min(3),
}


module.exports = validationRules