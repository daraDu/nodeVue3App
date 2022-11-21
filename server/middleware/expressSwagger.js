module.exports = (app) => {
    // 使用swagger API 文档
    const expressSwagger = require('express-swagger-generator')(app)
    let options = {
        swaggerDefinition: {
            info: {
                description: '工时系统h5+管理后台共用接口api',
                title: 'api',
                version: '1.0.0'
            },
            host: 'localhost:9000',
            basePath: '/',
            produces: ['application/json', 'application/xml'],
            schemes: ['http', 'https'],
            securityDefinitions: {
                JWT: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Authorization',
                    description: ''
                }
            }
        },
        route: {
            url: '/swagger',
            docs: '/swagger.json' //swagger文件 api
        },
        basedir: __dirname, //app absolute path
        files: ['../models/*.js', '../routes/**/*.js'] //Path to the API handle folder 模块文件路径以及路由文件路径
    }

    expressSwagger(options)
}