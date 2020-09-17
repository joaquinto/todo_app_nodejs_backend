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
    return res.status(400).send({message:'Bad Request', data:errors, status:400})
}

exports.idValidation = async(req,res,next)=>{
    const idSchema = Joi.object().keys({
        id : validationRules.title
    });
    
    const errors = joiValidator(req.params, idSchema)
    if (!errors) {
        return next();
    }
    return res.status(400).send({message:'Bad Request', data:errors, status:400})
}

exports.queryValidation = async(req,res,next)=>{
    const statusSchema =  validationRules.isCompleted
    if(req.query.isCompleted){
        const errors = joiValidator(req.query.isCompleted.toLowerCase(), statusSchema)
        if (!errors) {
            return next();
        }
        return res.status(400).send({message:'Bad Request', data:errors, status:400})
    }
    return next()
}