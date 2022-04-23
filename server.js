//////////////////////////////
// Importing Our Dependencies
//////////////////////////////

require("dotenv").config() // get our .env variables
const express = require("express") // web framework
const mongoose = require("mongoose") // Object Document Manager (ODM) (Work with DB)
const methodOverride = require("method-override") // override request methods  (Post to put or Post to Delete)
const morgan = require("morgan")  // used for logging
const { urlencoded } = require("express")
const res = require("express/lib/response")


//////////////////////////////
// Setup Database Connection
//////////////////////////////

// Loading DB url
const DATABASE_URL = process.env.DATABASE_URL  

// establish connection
mongoose.connect(DATABASE_URL)

// Save the connection
const cxn = mongoose.connection

// setup mongoose connection messages
cxn
.on("on", () => console.log("The Mongo Connection is Open!"))
.on("close", () => console.log("The Mongo Connection is Closed!"))
.on("error", (err) => console.log(err))

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
// Create Express Application
//////////////////////////////

const app = express()


//////////////////////////////
// Middleware - app.use(middleware function)
//////////////////////////////

app.use(methodOverride("_method")) // override request methods for form submissions
app.use(morgan("dev")) // log every request
app.use(express.urlencoded({extended: true})) // Parse html form bodies into req.body
app.use("/static", express.static("static")) // serve files statically


//////////////////////////////
// Routes 
//////////////////////////////

// test route
// app.get("/", (req, res) => {
//     res.send("<h1>Hello World</h1>")
// })

app.get("/", async (req, res) => {
    // go get todos
    const todos = await Todo.find({}).catch((err) => res.send(err))
    // render index.ejs
    res.render("index.ejs", {todos})
})

// async tells JS this is a asyncronous code
app.get("/todo/seed", async (req, res) => {
    // Todo.remove({}), (err, results)

    // delete all existing todos
    await Todo.remove({}).catch((err) => res.send(err))
    //add your sample todos
    const todos = await Todo.create([
        {text: "eat breakfast", completed: false},
        {text: "eat lunch", completed: false},
        {text: "eat dinner", completed: false}
    ]).catch((err) => res.send(err))
    // send the todos as json
    res.json(todos)
})

app.post("/todo", async (req, res) => {
    // create the todo
    await Todo.create(req.body).catch((err) => res.send(err))
    // redirect back to main page
    res.redirect("/")
})

app.put("/todo/:id", async (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the todo to be updated
    const todo = await Todo.findById(id)
    // update the todos completed property
    todo.completed = true
    await todo.save() // save changes
    // redirect back to main page
    res.redirect("/")
})


//////////////////////////////
// Server Listener
//////////////////////////////

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))