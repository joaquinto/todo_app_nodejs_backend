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

exports.findAll = async(query)=>{
    const {isCompleted} = query
    try{
        if(isCompleted){
            const todos = await Todo.find({completed:isCompleted})
            return todos
        }
        const todos = await Todo.find()
        return todos
    }
    catch(err){
        return err
    }
}


exports.updateTodo = async(todo, id)=>{
    const date = new Date()
    try{
        await Todo.updateOne({_id:id}, {title:todo.title}, {description:todo.description}, {updatedAt:date})
        const todoupdate = await Todo.findOne({_id:id})
        return todoupdate
    }catch (err){
        return err 
    }
}


exports.toggleTodoStatus = async(completed, id)=>{
    try{
        const date = new Date()
        const editTodo = await Todo.updateOne({_id:id}, {completed:completed}, {updatedAt:date})
        return editTodo
    }catch (err){
        return err
    }
} 

exports.deleteTodo = async(id)=>{
    try{
        const delTodo = await Todo.deleteOne({_id:id})
        return delTodo
    }catch (err){
        return err
    }
}