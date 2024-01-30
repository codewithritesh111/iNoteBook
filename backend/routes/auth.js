const express = require('express');
const route = express.Router();
const users = require('../models/users');
const {body,validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dot = require('dotenv');
const fetchUser = require('../middleware/fetchuser');
dot.config()

route.post('/signup',[
  body('name').isLength({min:3}),
  body('email',"Enter a valid email").isEmail(),
  body('password').isLength({min:5})
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.json({success:false,message:errors["errors"][0]['msg']})
    }
    const a = await users.findOne({email:req.body.email})
    if(a){
      return res.json({success:false,message:"User already exists"})
    }
    req.body.password = await bcrypt.hash(req.body.password,10)
    const use = await users.create(req.body);
    use.token = jwt.sign({use:use._id},"ritesh")
    res.status(201).json({success:true,message:use.token}); // Send a JSON response with the created user
    console.log(use.token)
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false,message:'Internal Server Error'});
  }
});

route.post('/login',async (req,res)=>{
  const email = req.body.email
  const a = await users.findOne({email:email})
  if(a){
    try{
      const pass = await bcrypt.compare(req.body.password,a.password)
      if(pass){
        const b = jwt.sign({use:a._id},"ritesh")
        return res.json({success: true, message:b})
      }
      else{
        res.json({success:false,message:"Invalid crenditial"})
      }
    }
    catch(error){
      res.send(error)
    }
  }
  else{
    res.send('Invalid Crenditial')
  }
})

route.get('/fetch',fetchUser,async(req,res)=>{
  try{
    const ans = res.ans
    res.json(await users.findOne({_id:ans}))
  }
  catch(error){
    res.send(error.message)
  }
})

route.get('/', (req, res) => {
  console.log(req.body);
  res.send('Hello');
});

module.exports = route;
