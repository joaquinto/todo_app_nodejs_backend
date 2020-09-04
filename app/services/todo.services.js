const Todo = require('../models/todo.model')

exports.postTodo = async(newTodo)=>{
    try{
        const createTodo = await Todo.create(newTodo)
        return createTodo
    }catch (err){
        return err
    }
}

exports.getOne = async(todo)=>{
    const {id}=todo
    try{
        const todo = await Todo.findOne({_id:id})
        return todo
    }catch (err){
        return err
    }
}

exports.findAll = async()=>{
    try{
        const todos = await Todo.find()
        return todos
    }catch (err){
        return err
    }
}