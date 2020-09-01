const Todo = require('../models/todo.model')

exports.postTodo = async(newTodo)=>{
    try{
        const createTodo = await Todo.create(newTodo)
        return createTodo
    }catch (err){
        console.log(error)
        return err
    }
}