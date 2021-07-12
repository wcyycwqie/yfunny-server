/*
 * @Author: Chaoyue
 * @Date: 2021-07-12 18:39:13
 * @LastEditors: Chaoyue
 * @LastEditTime: 2021-07-12 18:54:05
 * @FilePath: \my-server\routes\starry.js
 */
const express = require('express')
const router = express.Router()
const db = require('../database')

router.use((req, res, next) => {
    console.log('Starry API run')
    console.log(req.url);
    console.log(req.body);
    console.log(req.query);

    // 允许跨区请求
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    next()
})

router.get('/getDemoData', (req, res, next) => {
    let sql;
    sql = 'select * from demo'
    if (req.query.id) {
        sql = `select * from demo where demo_id = ${req.query.id}`
    }

    db(sql, null, (err, result, fields) => {
        if (err) throw err
        res.json({
            'code': 200,
            'ddata': result
        })
    })
})

router.post('/addNewDemo', (req, res, next) => {
    /* 
        @param

    */
    console.log(req.body);
    let sql = `INSERT INFO demo SET ?`
    db(sql, req.body, (err, result, fields) => {
        console.log(err);
        err && (res.json({
            'code': 202,
            'msg': 'False'
        })) || (res.json({
            'code': 200,
            'msg': 'success'
        }))
    })

})

module.exports = router