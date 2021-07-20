/*
 * @Author: 
 * @Date: 2020-09-09 17:48:03
 * @LastEditors: Chaoyue
 * @LastEditTime: 2021-07-19 18:03:11
 * @FilePath: \my-server\app.js
 */
/*
 * 
 * 　　┏┓　　　┏┓+ +
 * 　┏┛┻━━━┛┻┓ + +
 * 　┃　　　　　　　┃ 　
 * 　┃　　　━　　　┃ ++ + + +
 *  ████━████ ┃+
 * 　┃　　　　　　　┃ +
 * 　┃　　　┻　　　┃
 * 　┃　　　　　　　┃ + +
 * 　┗━┓　　　┏━┛
 * 　　　┃　　　┃　　　　　　　　　　　
 * 　　　┃　　　┃ + + + +
 * 　　　┃　　　┃
 * 　　　┃　　　┃ +  神兽保佑
 * 　　　┃　　　┃    代码无bug　　
 * 　　　┃　　　┃　　+　　　　　　　　　
 * 　　　┃　 　　┗━━━┓ + +
 * 　　　┃ 　　　　　　　┣┓
 * 　　　┃ 　　　　　　　┏┛
 * 　　　┗┓┓┏━┳┓┏┛ + + + +
 * 　　　　┃┫┫　┃┫┫
 * 　　　　┗┻┛　┗┻┛+ + + +
 * 
 */

/*
 * @Author: YYM
 * @Date: 2020-09-09 17:48:03
 * @LastEditTime: 2020-11-25 13:55:14
 * @LastEditors: Please set LastEditors
 * @Description: My Node Server
 * @FilePath: \my-server\app.js
 */
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const server = http.createServer()
// 引入路由
const routerMain = require('./routes/index')
const routerUser = require('./routes/user')
const routerStarry = require('./routes/starry')

const PORT = 80


// 使用中间件
app.use(express.static('public'))
app.use(express.static('views', {
	extensions: ['html']
}))

app.use(express.urlencoded({
	extended: false
}))
app.use(express.json())

app.use('/api', routerMain)
app.use('/user', routerUser)
app.use('/starry', routerStarry)

app.listen(PORT, (err) => {
	if (err) throw err
	console.log('服务器启动成功了，可以通过 http://127.0.0.1:' + PORT + '/ 来进行访问')
})