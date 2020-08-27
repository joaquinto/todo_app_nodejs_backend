const Joi = require('@hapi/joi')
const validationRules= require('../helpers/validationRules')
const joiValidator = require('../helpers/joiValidator')
exports.todoValidation = async(req,res,next)=>{
    const todoSchema = Joi.object().keys({
        title: validationRules.title,
        description: validationRules.description,
    });
    
    const errors = joiValidator(req.body, todoSchema)
    if (!errors) {
        return next();
    }
    res.status(400).send({message:'Bad Request', data:errors, status:400})
}
