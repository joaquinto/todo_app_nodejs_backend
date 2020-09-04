const Todo = require('../models/todo.model')

exports.isTodo = async(req,res,next)=>{
    try{
        const todo = await Todo.find({_id:req.params.id})
        if(todo.length>0){
            return next()
        }else{
            res.status(404).send({message:'Todo not found', status:404})
        }
        return todo
    }catch (err){
        return err
    }
}