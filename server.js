const express = require('express')
const _ = require('underscore')
const bodyParser = require('body-parser')
const app = express()
let PORT = process.env.PORT || 3000
let todos = []
let todoNextId = 1

app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Todo App')
})
app.get('/todos', function (req, res) {
  res.json(todos)
})
app.get('/todos/:id', function (req, res) {
  let todoId = parseInt(req.params.id, 10)
  let matchedTodo = _.findWhere(todos, { id: todoId })

  if (matchedTodo) {
    res.json(matchedTodo)
  } else {
    res.send({ status: 'No records found' })
  }
})

app.post('/todos', function (req, res) {
  let body = _.pick(req.body, 'description', 'completed')
  body.description = body.description.trim()

  if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) { return res.status(400).send('Invalid Request') }

  body.id = todoNextId++
  todos.push(body)
  res.json(body)
})

app.delete('/todos/:id', function (req, res) {
  let todoId = parseInt(req.params.id, 10)
  let matchedTodo = _.findWhere(todos, { id: todoId })

  if (!matchedTodo) {
    res.status(404).send({ status: 'No records found' })
  } else {
    todos = _.without(todos, matchedTodo)
  }
  console.log(matchedTodo)

  res.json(todos)
})

// PUT /todos/:id

app.put('/todos/:id', function (req, res) {
  let todoId = parseInt(req.params.id, 10)
  let matchedTodo = _.findWhere(todos, { id: todoId })
  let body = _.pick(req.body, 'description', 'completed')
  let validAttribute = {}

  if (!matchedTodo) {
    res.status(404).send()
  }

  if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
    validAttribute.completed = body.completed
  } else if (body.hasOwnProperty('completed')) {
    return res.status(400).send()
  }

  if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
    validAttribute.description = body.description
  } else if (body.hasOwnProperty('description')) {
    return res.status(400).send()
  }

  _.extend(matchedTodo, validAttribute)

  res.json(matchedTodo)
})

app.listen(PORT, function () {
  console.log('The server is running in ', PORT)
})
