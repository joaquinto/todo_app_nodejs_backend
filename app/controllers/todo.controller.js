const Todo = require('../services/todo.services')
const { postTodo } = Todo


exports.createTodo = async(req,res)=>{
    try{
        req.body.completed = false
        req.body.createdAt = new Date()
        const todo = await postTodo({...req.body})
        res.status(201).send({message:'Todo created successfully', data:todo, status:201})
    }catch (error){
        console.log(error)
        res.status(500).send({message:'Oops! An error occured', data:error, status:500})
    }
}