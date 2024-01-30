const notes = require('../models/notes')
const users = require('../models/users')
const express = require('express')
const app = express()
const fetchuser = require('../middleware/fetchuser')

app.get('/getnotes',fetchuser,async (req,res)=>{
    const id = res.ans
    // console.log(await users.find({_id:id}))
    const ans = await notes.find({user:id})
    res.json({notes:ans})
})

app.post('/addnote',fetchuser,async (req,res)=>{
    const id = res.ans
    const title = req.body.title
    const description = req.body.description
    const tags = req.body.tags
    const a = notes.create({
        user:id,title,description,tags
    })
    res.json({message:"Done with this"})
})

app.put('/update/:id',fetchuser,async(req,res)=>{
    try{
        const note = await notes.findById(req.params.id)
        if(!note) return res.send("Invalid Note")
        console.log(res.ans,note.user.toString())
        if(res.ans !== note.user.toString()) return res.send("Unauthorized user")
        const {title,description,tags} = req.body
        const a = {}
        if(title) a.title = title
        if(description) a.description = description
        if(tags) a.tags = tags
        const b = await notes.findByIdAndUpdate(req.params.id,{$set:a},{new :true})
        res.json({value:b})
    }
    catch(error){
        res.json({error:error.message})
    }
})

app.delete('/delete/:id',fetchuser,async(req,res)=>{
    try{
        const note = await notes.findById(req.params.id)
        if(!note) return res.send("Note not found")
        if(res.ans !== note.user.toString()) return res.send("Unauthorized user")
        const a = await notes.findByIdAndDelete(req.params.id)
        res.json(a)
    }
    catch(error){
        res.send(error.message)
    }
})


module.exports = app