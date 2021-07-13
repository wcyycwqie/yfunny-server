/*
 * @Author: Chaoyue
 * @Date: 2021-07-12 18:39:13
 * @LastEditors: Chaoyue
 * @LastEditTime: 2021-07-13 18:57:40
 * @FilePath: \my-server\routes\starry.js
 */
const express = require('express')
const router = express.Router()
const db = require('../database')
const multer = require('multer')

const upload = multer({
    dest: 'uploadFiles/files/demo_img'
})

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
    let sql,
        page = req.query.page || 1,
        pageCount = req.query.pageCount || 10;

    sql = `SELECT * FROM demo ORDER By demo_id DESC LIMIT ${(page - 1) * pageCount}, ${pageCount}`
    if (req.query.id) {
        sql = `select * from demo where demo_id = ${req.query.id}`
    }

    db(sql, null, (err, result, fields) => {
        if (err) throw err
        console.log('hohohohoho');
        console.log(result);
        console.log((result[0].tag));
        res.send({
            'code': 200,
            'Data': result
        })
    })
})

router.post('/addNewDemo', (req, res, next) => {
    /* 
        @param
        title,
        
        
    */
    console.log('********');
    console.log(req.body.title);

    let sql = `INSERT INTO demo SET ?`,
        values = {
            title: req.body.title,
            content: req.body.content,
            tag: req.body.tag
        }

    db(sql, values, (err, result, fields) => {
        console.log(err);
        err && (res.json({
            'code': 202,
            'msg': 'False'
        })) || (res.json({
            'code': 200,
            'msg': 'Success'
        }))
    })

})

module.exports = router