const mongoose = require('mongoose')

const model = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }
})

const Users = mongoose.model('users',model)
Users.createIndexes()
module.exports = Users