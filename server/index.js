const express = require('express')

const app = express()
//生成这个密钥生成token，一般这个存储在环境变量中，这里简便处理
app.set('secret', 'ssdasdad')
// app.use()  向应用程序添加新的中间件

// 使用swagger API 文档
require('./middleware/expressSwagger.js')(app)
// 解决跨域
app.use(require('cors')())
// 通过 express.json() 这个中间件，解析表单中的 JSON 格式的数据
app.use(express.json()) // 
// 静态文件托管（访问静态文件必须）
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/uploadsMultipart', express.static(__dirname + '/uploadsMultipart'))

require('./routes/admin/index.js')(app)
require('./routes/admin/upload.js')(app)
require('./routes/admin/uploadSlice.js')(app)
// require('./plugins/mysql')(app)
require('./plugins/mongoose')(app)

/* app.get('/', async(req, res)=>{
    res.send('index')
}) */
app.listen(9000, () => {
    console.log('http://localhost:9000/');
})