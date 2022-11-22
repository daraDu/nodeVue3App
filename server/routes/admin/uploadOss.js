module.exports = (app) => {
    const express = require('express');
    const fs = require('fs');
    const router = express.Router();
    const OSS = require('ali-oss');
    const multer = require('multer')
    let Duplex = require('stream').Duplex;
    // 把buffer转换为stream流
    function bufferToStream(buffer) {
        let stream = new Duplex();
        stream.push(buffer);
        stream.push(null);
        return stream;
    }
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
    const client = new OSS({
        // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
        region: '',
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        accessKeyId: '',
        accessKeySecret: '',
        // 填写Bucket名称。
        bucket: ''
    })
    // 不保存在本地
    const storage = multer.memoryStorage()
    const upload = multer({ storage })
    const month = new Date().getMonth() + 1
    let ossPath = new Date().getFullYear() + '-' + month + '-' + new Date().getDate()
    router.post('/uploadOss', upload.single('file'), async (req, res) => {
        // 使用put方法上传buffer
        let result = await client.put('ossdemo/' + ossPath + '/' + req.file.originalname, req.file.buffer);
        //使用putStream上传流到oss
        // let result = await client.putStream('ossdemo/' + req.file.originalname, bufferToStream(req.file.buffer));
        console.log(result);
        res.send({
            code: 200,
            msg: '上传成功',
            data: {
                url: result.url
            }
        })
    })
    app.use('/admin/api', router);
}