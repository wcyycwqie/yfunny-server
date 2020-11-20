/*
 * @Author: your name
 * @Date: 2020-11-19 14:57:31
 * @LastEditTime: 2020-11-20 14:39:24
 * @LastEditors: Please set LastEditors
 * @Description: User Api
 * @FilePath: \my-server\routes\user.js
 */
const express = require('express')
const router = express.Router()
const db = require('../database')

router.use((req, res, next) => {
    console.log('User API Run')
    console.log(req.url);
	console.log(req.body)
    console.log(req.query)
    res.setHeader('Access-Control-Allow-Origin',"*")
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    next()
})

router.get('/getUserInfo', (req, res, next) => {
    let sql;
    sql = "select * from user"
    if(req.query.id) {
        sql = `select * from user where id = ${req.query.id}`
    }

    db(sql, null, (err, result, fields) => {
        if (err) throw err
        res.json({
            'code': 200,
            'data': result
        })
    })
})

module.exports = router