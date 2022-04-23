//////////////////////////////
// Dependencies
//////////////////////////////

const { Router } = require("express")
const express = require("express")
const router = express.Router()
const TodoActions = require("./TodoActions")

//////////////////////////////
// Routes 
//////////////////////////////

// test route
// app.get("/", (req, res) => {
//     res.send("<h1>Hello World</h1>")
// })

router.get("/", TodoActions.index)

// async tells JS this is a asyncronous code
router.get("/seed", TodoActions.seed)

router.post("/", TodoActions.create)

router.put("/:id", TodoActions.update)

//////////////////////////////
// Export the Router
//////////////////////////////

module.exports = router