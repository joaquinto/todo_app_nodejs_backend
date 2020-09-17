const Todo = require('../services/todo.services')
const { postTodo, getOne, findAll, updateTodo, toggleTodoStatus, deleteTodo } = Todo

exports.createTodo = async(req,res)=>{
    try{
        req.body.completed = false
        req.body.createdAt = new Date()
        const todo = await postTodo({...req.body})
        return res.status(201).send({message:'Todo created successfully', data:todo, status:201})
    }catch (error){
        return res.status(500).send({message:'Oops! An error occured', data:error, status:500})
    }
}

exports.getOne = async(req,res)=>{
    try{
        const todo = await getOne({...req.params})
        return res.status(200).send({message:'Todo gotten successfully', data:todo, status:200})
    }catch (error){
        return res.status(500).send({message:'Oops! An error occured', data:error, status:500})
    }
}

exports.getTodos = async(req,res)=>{
    try{
        const todo = await findAll({...req.query})
        return res.status(200).send({message:'Todos fetched successfully', data:todo, status:200})
    }catch (error){
        return res.status(500).send({message:'Oops! An error occured', data:error, status:500})
    }
}

exports.updateTodo = async(req,res)=>{
    try{
        const todo = await updateTodo({...req.body}, req.params.id)
        return res.status(200).send({message:'Todo updated successfully', data:todo, status:200})
    }catch(err){
        return res.status(500).send({message:' Oops! an error occured', data:error, status:500})
    }
}

exports.updateStatus = async(req,res)=>{
    try{
        let completed = !req.completed
        const updatedTodo = await toggleTodoStatus(completed, req.params.id)
        return res.status(200).send({message:'Todo updated successfully', data:updatedTodo, status:200})
    }catch(err){
        return res.status(500).send({message:' Oops! an error occured', data:err, status:500})
    }
}

exports.deleteTodo = async(req,res)=>{
    try{
        const delTodo = await deleteTodo(req.params.id)
        return res.status(200).send({message:'Todo deleted successfully', data:delTodo, status:200})
    }catch(err){
        return res.status(500).send({message:' Oops! an error occured', data:err, status:500})
    }
}

