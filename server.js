//////////////////////////////
// Importing Our Dependencies
//////////////////////////////

require("dotenv").config() // get our .env variables
const express = require("express") // web framework
const methodOverride = require("method-override") // override request methods  (Post to put or Post to Delete)
const morgan = require("morgan")  // used for logging

const TodoRouter = require("./controllers/todoController")


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
app.use("/todo", TodoRouter)
// when doing app.use("/todo", TodoRouter)


//////////////////////////////
// Server Listener
//////////////////////////////

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))