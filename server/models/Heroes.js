const mongoose = require('mongoose')
const HeroSchema = new mongoose.Schema({
    name: String,
    avatar: String
})

module.exports = mongoose.model('Hero', HeroSchema, 'Hero')