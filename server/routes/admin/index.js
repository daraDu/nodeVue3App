module.exports = app => {
  const express = require('express')
  const path = require('path')
  const multipart = require('multipart')
  const router = express.Router() // express 子路由
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')
  const authMiddleware = require('../../middleware/auth')
  let OSS = require('ali-oss');
  // 增
  router.post('/add', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send({ code: 200, data: model })
  })
  // 查 .populate()查找对应的parent的数据
  router.get('/lists', async (req, res) => {
    console.log('=lists===', req.user);
    // .populate('parent')
    let queryOptions = {}
    if (req.Model === 'Category') {
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(10)
    res.send({ code: 200, data: items })
  })
  // 删
  router.post('/delet/:id', async (req, res) => {
    const model = await req.Model.findByIdAndDelete({ "_id": req.params.id })
    res.send(model)
  })
  // 改
  router.post('/edit/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate({ "_id": req.params.id }, req.body)
    res.send(model)
  })
  // 通用接口
  app.use('/admin/api/rest/:resource', authMiddleware(), async (req, res, next) => {
    let model = req.params.resource
    //把首字母换成大写的，这样就获取到了模型名称
    model = model.charAt(0).toUpperCase() + model.slice(1)
    model = require(`../../models/${model}`)
    console.log('37-=--', model);
    req.Model = model
    next()
  }, router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  //  upload.single 单文件上传
  const client = new OSS({
    // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
    region: 'oss-cn-hangzhou',
    // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
    accessKeyId: 'LTAI5t6RpMGq8ri1WnMeRKW4',
    accessKeySecret: 'DoE4QYZfoWfbjMH5ksTFnnJsrRQ41N',
    // 填写Bucket名称。
    bucket: 'dssces'
  })
  const headers = {
    // 指定Object的存储类型。
    'x-oss-storage-class': 'Standard',
    // 指定Object的访问权限。
    'x-oss-object-acl': 'private',
    // 设置Object的标签，可同时设置多个标签。
    'x-oss-tagging': 'Tag1=1&Tag2=2',
    // 指定PutObject操作时是否覆盖同名目标Object。此处设置为true，表示禁止覆盖同名Object。
    'x-oss-forbid-overwrite': 'true',
  };
  app.post('/admin/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    console.log('file===', file);
    const result = await client.put(file.originalFilename, path.normalize(upload + file.originalFilename)
      // 自定义headers
      , { headers }
    );
    console.log('result===', result);
    file.url = `http://localhost:9000/uploads/${file.filename}`
    res.send(file)
  })
  //登录
  /**
   * 项目阶段列表
   * @route post /admin/api/login
   * @group user - 用户模块
   * @param {loginBody.model} loginRet.body.required - the new point
   * @returns {loginRet.model} 200 - An array of user info
   * @returns {Error}  default - Unexpected error
   */
  /**
   * @typedef loginBody
    * @property {string} username  - 用户名
    * @property {string} password  - 密码
   */
  // 返回字段
  /**
   * @typedef loginRet
    * @property {string} token  - token
    * @property {string} id  - 用户id
    * @property {string} name  - 姓名
    * @property {string} username  - 用户名称
   */
  app.post('/admin/api/login', async (req, res) => {
    let { name, password } = req.body
    /**
     * 由于在AdminUser模型中设置了password字段默认不被查出来（select:false），如果想要查询
     * password这个字段，用select('+password')表示增加查询password这个字段
     */
    const user = await AdminUser.findOne({ name }).select('+password')
    console.log('登录==', typeof password);
    //1.查询不到用户
    if (!user) {
      res.send({
        code: 401,
        msg: '用户不存在'
      })
      return
    }
    //2.校验密码
    //用用户传进来的password和数据库中查到的用户password值进行对比 
    // 第一个字段 password 必须是string类型 String to compare
    password = password.toString()
    let isValid = require('bcryptjs').compareSync(password, user.password)
    //密码错误
    if (!isValid) {
      res.send({
        code: 401,
        msg: '密码错误'
      })
      return
    }

    //3.返回token
    //生成token
    const token = jwt.sign({
      id: user._id
    }, app.get('secret'))

    res.send({
      code: 200,
      token
    })
  })
}