const Joi = require('@hapi/joi')

const validationRules = {
    title: Joi.string().required().trim().min(3),
    description: Joi.string().required().trim().min(3),
}


module.exports = validationRules