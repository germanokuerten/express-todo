//////////////////////////////
// Dependencies
//////////////////////////////

require("dotenv").config()
const mongoose = require("mongoose")


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
// Export the Connection
//////////////////////////////

module.exports = mongoose