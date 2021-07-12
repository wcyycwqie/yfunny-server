/*
 * @Author: your name
 * @Date: 2020-11-19 14:39:01
 * @LastEditTime: 2021-07-12 17:39:26
 * @LastEditors: Chaoyue
 * @Description: Database Connection
 * @FilePath: \my-server\database.js
 */

module.exports = (sql, param, callback) => {
    const mysql = require('mysql')

    const connection = mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'y_starry',
        dateStrings: true
    })

    connection.connect()

    connection.query(sql, param, callback)

    connection.end()
}