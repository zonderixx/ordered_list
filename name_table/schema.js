const Pool = require('pg').Pool;

//using pg tool for now
//Scheme for Postgres
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 'ZonderixDB',
    port: 5432,
})

module.exports = pool;