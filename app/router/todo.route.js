module.exports = app =>{
    const todos = require('../controllers/todo.controller')
    const validation = require('../middlewares/validation')
    const {isTodo} = require('../middlewares/todoAuthentication')
    const { todoValidation, idValidation } = validation
    const { createTodo, getOne, getTodos  } = todos
    app.post("/todos", todoValidation, createTodo)
    app.get("/todos/:id", idValidation, isTodo, getOne)
    app.get("/todos", getTodos)
}