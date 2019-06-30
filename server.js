const express = require('express')
const app = express()
let PORT = process.env.PORT || 3000

app.get('/', function (req, res) {
  res.send('Todo App')
})

app.listen(PORT, function () {
  console.log('The server is running in ', PORT)
})
