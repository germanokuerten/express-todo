//////////////////////////////
// Dependencies
//////////////////////////////

const Todo = require("../models/Todo")

//////////////////////////////
// Actions (Functions)
//////////////////////////////

const actions = {}

actions.index = async (req, res) => {
    // go get todos
    const todos = await Todo.find({}).catch((err) => res.send(err))
    // render index.ejs
    res.render("index.ejs", {todos})
}

actions.seed = async (req, res) => {
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
}

actions.create = async (req, res) => {
    // create the todo
    await Todo.create(req.body).catch((err) => res.send(err))
    // redirect back to main page
    res.redirect("/todo")
}

actions.update = async (req, res) => {
    // get the id from params
    const id = req.params.id
    // get the todo to be updated
    const todo = await Todo.findById(id)
    // update the todos completed property
    todo.completed = true
    await todo.save() // save changes
    // redirect back to main page
    res.redirect("/todo")
}


//////////////////////////////
// Export the actions object
//////////////////////////////

module.exports = actions