/*
 * @Author: Chaoyue
 * @Date: 2020-11-19 14:57:47
 * @LastEditors: Chaoyue
 * @LastEditTime: 2021-07-12 18:36:52
 * @FilePath: \my-server\routes\index.js
 */


const express = require('express')
const router = express.Router()
const multer = require('multer')

const db = require('../database')

const upload = multer({ dest: 'uploadFiles/files' })

router.use((req, res, next) => {
    console.log('main router run');
    next()
})


router.post('/uploadFile', upload.single('myFile'), (req, res, next) => {
    console.log(req.body);
    console.log(req.file);
})



module.exports = router