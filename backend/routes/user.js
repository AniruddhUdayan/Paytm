const express = require('express')
const app = express()
const { z } = require('zod');
const {User} = require('../db')
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

mongoose.connect('mongodb+srv://Ani:Abhiani@atlascluster.phipben.mongodb.net/')

const schemaSignUp = z.object({
    username: z.string().email(),
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    password: z.string().min(6),
  });
const schemaSignIn = z.object({
    username: z.string().email(),
    password: z.string().min(6),
  });

app.post('/signup', async (req,res)=>{
  try {
    const {username , firstName , lastName , password} = schemaSignUp.safeParse(req.body)
    if (!username) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const exisitngUser = await User.findOne({username});
    if(exisitngUser){
        return res.status(411).send('User already exists')
    }
    const user = await User.create({username , firstName , lastName , password})
    const userId = user._id;
    
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token
    })
    
  } catch (error) {
    console.error('Validation error:', error.message);
    
    // Send error response
    res.status(400).send('Error while signing in');
  }
})

app.post('/signin',async (req,res)=>{
   try {
    const {username , password} = schemaSignIn.safeParse(req.body);
    if (!username) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const exisitngUser = await User.findOne({username});
    if(!exisitngUser){
        return res.status(411).send('User does not exist exists')
    }
    const userId = exisitngUser._id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        token: token
    })
   } catch (error) {
    console.error('Validation error:', error.message);
    
    // Send error response
    res.status(400).send('Error while logging in');
   }
})