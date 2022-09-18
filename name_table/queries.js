const pool = require("./schema");
//import sql shema

const getAllItemsForUsers = (request, response) => {
  pool.query('SELECT * FROM items ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

// for sorting allItems
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
    `INSERT INTO user_order (item_id, user_id, orders) VALUES ((SELECT id FROM items WHERE name = '${itemName}'), (SELECT id FROM users_auth WHERE email = '${user.email}'), ${parseInt(first.rows[0].count)+1})`,
    );
  return response.json('Item created')  
};
  
const deleteItem = async (request, response) => {
    const id = parseInt(request.params.id)
    await pool.query('DELETE FROM items WHERE id = $1', [id])

    await pool.query('DELETE FROM user_order WHERE item_id = $1', [id])
    return response.json(`Item deleted with ID: ${id}`)
}
  
module.exports = {
    getUserByEmail,
    getAllItems, 
    getItemById,
    createItem,
    deleteItem,
    getUserOrders,
    getAllItemsForUsers
}