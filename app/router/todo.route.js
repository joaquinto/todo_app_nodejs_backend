module.exports = app =>{
    const todos = require('../controllers/todo.controller')
    const validation = require('../middlewares/validation')
    const { todoValidation } = validation
    const { createTodo, getTodos } = todos
    app.post("/todos", todoValidation, createTodo)
    app.get("/todos", getTodos)
}