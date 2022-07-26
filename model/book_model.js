const mongoose = require('mongoose')
const db = require('../db/mongodb')


const bookSchema = new mongoose.Schema({
    title: {
        type:String,
        default:'----',
        required: true
    },
    year: {
        type:Number,
        required: true
    },
    auother: {
        type:String,
        default:'----',
        required: true
    }
})

const bookmodel = mongoose.model('books',bookSchema)

module.exports = bookmodel