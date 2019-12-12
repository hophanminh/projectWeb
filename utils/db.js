const mysql = require('mysql');
const util = require('util');
const config = require('../config/default.json');

const pool = mysql.createPool(config.mysql);

pool.getConnection(function(err, connection) {
    console.log('Connected to database');
});

const mysql_query = util.promisify(pool.query).bind(pool);

module.exports = {
    load: sql => mysql_query(sql),
    add: (tableName,entity) => mysql_query(`insert into ${tableName} set ?`,entity),
    delete: (tableName,entity) => mysql_query(`delete from ${tableName} where ?`,entity),
    modify:(tableName,entity,condition) => mysql_query(`update ${tableName} set ? where ?`,[entity,condition]),
};