const { update } = require('../models/todo.model')

module.exports = app =>{
    const todos = require('../controllers/todo.controller')
    const validation = require('../middlewares/validation')
    const {isTodoValid} = require('../middlewares/todoAuthentication')
    const { todoValidation, idValidation } = validation
    const { createTodo, getOne, getTodos, updateTodo, updateStatus  } = todos
    app.post("/todos", todoValidation, createTodo)
    app.get("/todos/:id", idValidation, isTodoValid, getOne)
    app.get("/todos", getTodos)
    app.put("/todos/:id", idValidation, todoValidation, isTodoValid, updateTodo)
    app.put("/todos/:id/status_update", idValidation, isTodoValid, updateStatus)
}