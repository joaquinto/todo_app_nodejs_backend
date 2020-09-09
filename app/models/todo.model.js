const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const todoSchema = Schema({
  title: { type: String, required: true }, 
  description: { type: String, required: true }, 
  completed: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date },
});

module.exports = mongoose.model('Todo', todoSchema)  