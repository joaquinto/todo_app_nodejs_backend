const Todo = require('../services/todo.services')
const { postTodo, getOne, findAll } = Todo


exports.createTodo = async(req,res)=>{
    try{
        req.body.completed = false
        req.body.createdAt = new Date()
        const todo = await postTodo({...req.body})
        res.status(201).send({message:'Todo created successfully', data:todo, status:201})
    }catch (error){
        res.status(500).send({message:'Oops! An error occured', data:error, status:500})
    }
}

exports.getOne = async(req,res)=>{
    try{
        const todo = await getOne({...req.params})
        res.status(200).send({message:'Todo gotten successfully', data:todo, status:200})
    }catch (error){
        res.status(500).send({message:'Oops! An error occured', data:error, status:500})
    }
}

exports.getTodos = async(req,res)=>{
    try{
        const todo = await findAll()
        res.status(200).send({message:'Todos fetched successfully', data:todo, status:200})
    }catch (error){
        res.status(500).send({message:'Oops! An error occured', data:error, status:500})
    }
}