/*
 * @Author: Chaoyue
 * @Date: 2021-07-12 18:39:13
 * @LastEditors: Chaoyue
 * @LastEditTime: 2021-07-20 17:58:33
 * @FilePath: \my-server\routes\starry.js
 */
const express = require('express')
const router = express.Router()
const db = require('../database')
const app = express()

const multer = require('multer')

const upload = multer({
    dest: 'uploadFiles/files/demo_img'
})

router.use((req, res, next) => {
    console.log('Starry API run')
    console.log(req.url);
    console.log(req.body);
    console.log(req.query);
    console.log(req.file);

    // 允许跨区请求
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,DELETE')
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    next()
})

router.get('/getStarData', (req, res, next) => {
    let sql,
        page = req.query.page || 1,
        pageCount = req.query.pageCount || 10;


    let testArr = ['hoho', 'hahaha']

    sql = `SELECT * FROM demo ORDER BY demo_id DESC LIMIT ${(page - 1) * pageCount}, ${pageCount}`
    if (req.query.id) {
        sql = `SELECT * FROM star WHERE star_id = ${req.query.id}`
    }

    db(sql, null, (err, result, fields) => {
        if (err) throw err
        result.map(el => {
            el.tag = JSON.parse(el.tag)
        })
        res.json({
            code: 200,
            Data: result
        })
    })
})

router.post('/addNewStar', upload.array('imgIcon'), (req, res, next) => {
    // upload.single(name) name 对应前端input[type=file]的name
    /* 
        @param
        title: String,
        content: String,
        tag: [String, String],
        
    */
    console.log('add');
    console.log(req.file);
    console.log(req.files);
    let sql = `INSERT INTO star SET ?`,
        values = {
            title: req.body.title,
            content: req.body.content,
            tag: req.body.tag || [],
        }

    req.file && (values.file = req.file.filename)

    console.log(values);
    return
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

router.delete('/delDemo', (req, res, next) => {
    console.log('del');
    let sql = `DELETE FROM star WHERE star_id = ${req.query.id};`
    db(sql, null, (err, result, fields) => {
        if (err) throw err
        res.json({
            code: 200,
            Data: 'del success'
        })
    })

})



module.exports = router