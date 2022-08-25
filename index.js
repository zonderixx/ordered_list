const express = require('express')
const bodyParser = require('body-parser')
const db = require('./name_table/queries')
const register = require('./controller/register')
const login = require('./controller/login')
require('dotenv').config()
// const cors = require ('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(express.json());
// app.use(cors())

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

app.post('/register', register)
app.post('/login', login)

//running the server
app.listen(port, () => { console.log(`Server is running on PORT ${port}`) })