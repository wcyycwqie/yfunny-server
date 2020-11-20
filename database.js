/*
 * @Author: your name
 * @Date: 2020-11-19 14:39:01
 * @LastEditTime: 2020-11-19 15:29:06
 * @LastEditors: Please set LastEditors
 * @Description: Database Connection
 * @FilePath: \my-server\routes\database.js
 */

 module.exports = (sql, param, callback) => {
    const mysql = require('mysql')
    
    const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'personal_blog',
        dateStrings: true
    })

    connection.connect()

    connection.query(sql, param, callback)

    connection.end()
 }