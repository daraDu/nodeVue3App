module.exports = app=>{
    const mysql = require('mysql')
    const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'test'
    })
    connection.connect()
    connection.end()
}