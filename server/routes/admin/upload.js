module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const multiparty = require('multiparty')
    const { fs } = require('fs');

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
        multipartForm.parse(req, (err, fields, files) => {
            try {
                console.log('25===', fields, files);
                let upFile = files.file[0]
                // 重命名
                res.send({
                    code: 200,
                    msg: '上传成功',
                    fileName: upFile.originalFilename,
                    fileSize: ((upFile.size) / 1048576).toFixed(2) + 'M'
                })
            } catch {
                console.log('err===', err);
            }
        })
    })
    app.use('/admin/api', router);
}