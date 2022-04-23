//////////////////////////////
// Dependencies
//////////////////////////////

const mongoose = require("./connection")   // import the already connected object

//////////////////////////////
// Schemas and Models
//////////////////////////////

// Schema the definition of our data type
// Model, the object for working with our data type
const todoSchema = new mongoose.Schema({
    text: String,
    completed: Boolean   
},  {timestamps: true})

const Todo = mongoose.model("todo", todoSchema)

//////////////////////////////
// Export the Model
//////////////////////////////

module.exports = Todo