const { request, response } = require("express");
const pool = require("./schema");
//import sql shema

const getItems = (request, response) => {
  
  const userEmail = request.user.email;
  pool.query('SELECT * FROM items ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      };
    const allItems = results.rows
      console.log(userEmail, allItems);
    })
}

const getOrders = (request, response) => {
  const user = getUserByEmail(request.user.email)
  const id = user.id
  console.log(id);
  pool.query('SELECT * FROM user_order WHERE user_id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.json(results.rows)
    console.log(results.rows);
  })
}

const getUserByEmail = (email) => {

  pool.query('SELECT * FROM users_auth WHERE email = $1,' [email], (error, results) => {
    if (error) {
      throw error
    }
    console.log(results);
    const data = results.rows[0]
    console.log(data);
    return data
  })
}

  
const getItemById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM items WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
}
  
const createItem = (request, response) => {
    const { name, email } = request.body
  
    pool.query('INSERT INTO items (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`Item added with ID: ${results.insertId}`)
    })
}
  
const updateItem = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body
  
    pool.query(
      'UPDATE items SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Item modified with ID: ${id}`)
      }
    )
}
  
const deleteItem = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM items WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Item deleted with ID: ${id}`)
    })
}
  
module.exports = {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getOrders
}