module.exports = (app) => {
    const express = require('express');
    const path = require('path');
    const router = express.Router();
    const multiparty = require('multiparty')
    const { fs } = require('fs');
    const OSS = require('ali-oss');
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
        region: 'oss-cn-hangzhou',
        // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
        accessKeyId: 'LTAI5t6RpMGq8ri1WnMeRKW4',
        accessKeySecret: 'DoE4QYZfoWfbjMH5ksTFnnJsrRQ41N',
        // 填写Bucket名称。
        bucket: 'dssces'
    })
    // 多文件上传
    router.post('/uploadMultipart', (req, res) => {

        // 生成multipart对象
        var multipartForm = new multiparty.Form();
        // 设置文件存储路径
        // 这个路径文件夹一定一定一定要提前创建，否则不会成功，也不提示报错
        multipartForm.uploadDir = __dirname + '/../../uploadsMultipart'

        /**
         * parse 表单解析
         * fields：普通的表单数据
         * files：上传的文件信息
         * **/
        multipartForm.parse(req, async (err, fields, files) => {
            try {
                let upFile = files.file[0]
                // 重命名
                res.send({
                    code: 200,
                    msg: '上传成功',
                    fileName: upFile.originalFilename,
                    fileSize: ((upFile.size) / 1048576).toFixed(2) + 'M'
                })
                console.log('51===', path.normalize(multipartForm.uploadDir + '/' + upFile.originalFilename));
                const month = new Date().getMonth + 1
                let ossPath = new Date().getFullYear + '-' + month + new Date().getDate()
                const result = await aliOSS.client.put(ossPath + '/' + upFile.originalFilename,
                    upFile,
                    // 自定义headers
                    { headers: aliOSS.headers }
                );
                console.log('result===', result);
            } catch {
                console.log('err===', err);
            }
        })
    })
    app.use('/admin/api', router);
}