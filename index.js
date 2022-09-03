const express = require('express')
const bodyParser = require('body-parser')
const db = require('./name_table/queries')
const register = require('./controller/register')
const login = require('./controller/login')
require('dotenv').config()
const authorization = require('./middleware/auth_middleware')
const {getUserItems} = require('./handlers/getUserItems')
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

app.get('/', authorization, getUserItems)
app.get('/orders', authorization, db.getUserOrders)

app.get('/items', authorization, db.getAllItems)
app.get('/items/:id', authorization, db.getItemById)
app.post('/items', authorization, db.createItem)
app.put('/items/:id', authorization, db.updateItem)
app.delete('/items/:id', authorization, db.deleteItem)


//running the server
app.listen(port, () => { console.log(`Server is running on PORT ${port}`) })