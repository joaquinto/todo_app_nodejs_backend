module.exports = app =>{
    const todos = require('../controllers/todo.controller')
    const validation = require('../middlewares/validation')
    const { todoValidation } = validation
    const { createTodo } = todos
    app.post("/todos", todoValidation, createTodo)
}