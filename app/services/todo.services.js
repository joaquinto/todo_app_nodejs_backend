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
    try{
        const getTodoQuery = await getQuery(query)
        const todos = await Todo.find(getTodoQuery)
        return todos
    }
    catch(err){
        return err
    }
}

const getQuery = (queryObj) =>{
    const { isCompleted, from_date, to_date} = queryObj
    if(isCompleted && from_date){
        const query = {createdAt:{ $gte: new Date(new Date(from_date).setHours(00, 00, 00)), $lte: new Date(new Date(to_date).setHours(23, 59, 59)) }, completed:isCompleted}
        return query
    }
    if(from_date){ 
        const query = {createdAt:{ $gte: new Date(new Date(from_date).setHours(00, 00, 00)), $lte: new Date(new Date(to_date).setHours(23, 59, 59)) }}
        return query
    }
    if(isCompleted){
        const query = {completed:isCompleted}
        return query
    }
    const query = {}
    return query

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