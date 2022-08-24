const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const app = express()
const PORT = 3000

app.use(bodyParser.json())

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
)
//methods for REST API
app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

//running the server
app.listen(PORT, () => { console.log(`Server is running on PORT ${PORT}`) })