module.exports = (app) => {
    const express = require('express');
    const router = express.Router();
    const multiparty = require('multiparty')
    const fs = require('fs')
    const fse = require('fs-extra')
    const path = require('path')
    const upload_dir = __dirname + '/../../uploadsMultipart/slice'
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
        res.send({
            msg: '合并成功',
            url: `http://localhost:9000/uploadsMultipart/slice/${name}`
        })
    })
    app.use('/admin/api', router);
}