const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    port: 3012,
    user: 'root',
    password: 'root',
    database: 'auctiondb'
});

pool.getConnection(function(err, connection) {
    console.log('Connected to database');
});

const mysql_query = util.promisify(pool.query).bind(pool);

module.exports = {
    load: sql => mysql_query(sql),
    add: (tableName,entity) => mysql_query(`insert into ${tableName} set ?`,entity),
    delete: (tableName,entity) => mysql_query(`delete from ${tableName} where ?`,entity),
};