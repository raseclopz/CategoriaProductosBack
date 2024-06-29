const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'thinkpad2044',
    database: process.env.MYSQL_DATABASE || 'CategoriaProductosDB',
    port: process.env.MYSQL_PORT || 3306
});

module.exports = pool.promise();
