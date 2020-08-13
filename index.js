const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require("cors")
const mongoose = require('mongoose')
const path = require('path')
app.use(cors());
app.use(bodyparser.json())
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.status(200).send({ message: 'Todo app up and running' })
});

const port = process.env.PORT || 8085       
app.listen(port, ()=> console.log(`listening on port ${port}...`))

mongoose.connect(`mongodb+srv://sca:ySwems6Q87IRzoi5@cluster0.q88tk.mongodb.net/todo_app?retryWrites=true&w=majority`, { useNewUrlParser: true })
.then(() => { 
    console.log('Successfully connected to MongoDB Atlas!') 
}) 
.catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!')
    console.error(error)
});

require('./app/router/todo.route')(app)