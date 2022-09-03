const pool = require("./schema");
//import sql shema

const getAllItems = async () => {
  const items = await pool.query('SELECT * FROM items ORDER BY id ASC')
  return items.rows
}

const getUserOrders = async (user) => {
  // const user = await getUserByEmail(request.user.email);
  const res = await pool.query(
    "SELECT * FROM user_order WHERE user_id = $1",
    [user.id]
  );
  return(res.rows)
};

const getUserByEmail = async (email) => {
  const users = await pool.query('SELECT * FROM users_auth WHERE email = $1', [email])
  return users.rows[0];
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
    getUserByEmail,
    getAllItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    getUserOrders
}