module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const multiparty = require('multiparty')
    const fs = require('fs')
    const fse = require('fs-extra')
    const path = require('path')
    const OSS = require('ali-oss');

    const upload_dir = __dirname + '/../../uploadsMultipart/slice'


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
    router.post('/uploadSlice', (req, res) => {
        const form = new multiparty.Form({ uploadDir: upload_dir })
        form.parse(req)
        form.on('file', async (name, chunk) => {
            console.log(chunk);
            // 存放切片的目录 
            let chunkDir = `${upload_dir}/${chunk.originalFilename.split('.')[0]}`
            if (!fse.existsSync(chunkDir)) {
                await fse.mkdirs(chunkDir)
            }
            // 原文件名
            let dPath = path.join(chunkDir, chunk.originalFilename.split('.')[1])
            // 移动文件
            await fse.move(chunk.path, dPath, { overwrite: true })
            res.send('文件上传成功')
        })
    })
    router.post('/merge', async (req, res) => {
        let name = req.body.name
        let fname = name.split('.')[0]
        let chunkDir = path.join(upload_dir, fname)
        let chunks = await fse.readdir(chunkDir)
        chunks.sort((a, b) => a - b).map(chunkPath => {
            fs.appendFileSync(
                path.join(upload_dir, name),
                fs.readFileSync(`${chunkDir}/${chunkPath}`)
            )
        })
        fse.removeSync(chunkDir)
        const pathFile = upload_dir + '/' + name
        const result = await client.put(name, path.normalize(pathFile)
            // 自定义headers
            , { headers }
        );
        console.log('result', result);
        res.send({
            msg: '合并成功',
            url: `http://localhost:9000/uploadsMultipart/slice/${name}`
        })
    })
    app.use('/admin/api', router);
}