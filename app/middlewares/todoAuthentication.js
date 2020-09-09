const Todo = require('../models/todo.model')

exports.isTodoValid = async(req,res,next)=>{
    try{
        const todo = await Todo.find({_id:req.params.id})
        if(todo.length<1){
            
            return res.status(404).send({message:'Todo not found', status:404})
            
        }
        req.completed = todo[0].completed
        return next()
    }catch (err){
        return err
    }
}