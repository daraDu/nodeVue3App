module.exports = app =>{
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://192.168.31.169:27017/nodeVue')
}