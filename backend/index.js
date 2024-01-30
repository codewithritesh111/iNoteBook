const express = require('express')
const mongoose = require('mongoose')
const app = express()
var cors = require('cors')
app.use(cors())
mongoose.connect('mongodb://127.0.0.1:27017/inotebook')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))
app.get('/',(req,res)=>{
    res.send('Hello World')
})

app.listen(5000,()=>{
    console.log('App listening at port 5000')
})