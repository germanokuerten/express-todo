//////////////////////////////
// Importing Our Dependencies
//////////////////////////////

require("dotenv").config() // get our .env variables
const express = require("express") // web framework
const mongoose = require("mongoose") // Object Document Manager (ODM) (Work with DB)
const methodOverride = require("method-override") // override request methods  (Post to put or Post to Delete)
const morgan = require("morgan")  // used for logging
const { urlencoded } = require("express")


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

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})


//////////////////////////////
// Server Listener
//////////////////////////////

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))