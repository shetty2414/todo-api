const express = require('express')
const _ = require('underscore')
const bodyParser = require('body-parser')
const app = express()
let PORT = process.env.PORT || 3000
// let todos = [{
//   id: 1,
//   description: 'Meet mom for lunch',
//   completed: false
// },
// {
//   id: 2,
//   description: 'Go to market',
//   completed: false
// },
// {
//   id: 3,
//   description: 'Feed the cat',
//   completed: false
// }]

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
  let matchedTodo
  _.each(todos, function (todo) {
    if (todoId === todo.id) {
      matchedTodo = todo
    }
  })
  if (matchedTodo) {
    res.json(matchedTodo)
  } else {
    res.send({ status: 'No records found' })
  }
})

app.post('/todos', function (req, res) {
  let body = req.body
  res.json(body)
  body.id = todoNextId++
  todos.push(body)
})

app.listen(PORT, function () {
  console.log('The server is running in ', PORT)
})
