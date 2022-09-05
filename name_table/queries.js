const pool = require("./schema");
//import sql shema

const getAllItems = async () => {
  const items = await pool.query('SELECT * FROM items ORDER BY id ASC')
  return items.rows
}

const getUserOrders = async (user) => {
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

const getItemByEmail = async (email) => {
  const users = await pool.query('SELECT * FROM items WHERE email = $1', [email])
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
  
const createItem = async (request, response) => {
  const { name: itemName, email: itemEmail } = request.body;
  const userEmailItem = await getItemByEmail(itemEmail)
  if (userEmailItem) {
    return response.json('Email alreay exists')
  }
  const user = await getUserByEmail(request.user.email);
  await pool.query(
    "INSERT INTO items (name, email) VALUES ($1, $2)",
    [itemName, itemEmail]
  );

 const first = await pool.query(`SELECT count(*) FROM user_order WHERE user_id = '${user.id}'`)  

  await pool.query(
    `INSERT INTO user_order (item_id, user_id, orders) VALUES ((SELECT id FROM items WsHERE name = '${itemName}'), (SELECT id from users_auth where email = '${user.email}'), ${parseInt(first.rows[0].count)+1})`,
    );
  return response.json('Item created')  
};
  
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