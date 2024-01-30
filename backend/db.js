const mongoose = require('mongoose')

const connect = ()=>{ 
    try{
        mongoose.connect('mongodb://127.0.0.1:27017')
        console.log("Connection to mongodb string is done")
    }
    catch(err){
        console.log(err.message)
    }
}

module.exports = connect