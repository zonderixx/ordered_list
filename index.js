const express = require('express')
const bodyParser = require('body-parser')
const db = require('./name_table/queries')
const register = require('./controller/register')
const login = require('./controller/login')
require('dotenv').config()
const authorization = require('./middleware/auth_middleware')
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

app.post('/register', register)
app.post('/login', login)


app.get('/users', authorization, db.getUsers)
app.get('/users/:id', authorization, db.getUserById)
app.post('/users', authorization, db.createUser)
app.put('/users/:id', authorization, db.updateUser)
app.delete('/users/:id', authorization, db.deleteUser)


//running the server
app.listen(port, () => { console.log(`Server is running on PORT ${port}`) })