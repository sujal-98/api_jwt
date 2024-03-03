const express = require('express');
const bcrypt=require('bcryptjs')
const User=require('../modal/user');
const {validation,loginvalidation}=require('../validation/val')
const route = express.Router();


route.post('/register', async (req, res) => {
    const {error}=validation(req.body)
    if (error) {
        res.status(400).send(error.details);
    }
    //check if user is already on the database
    const emailExist=await User.findOne({email:req.body.email})
    if(emailExist) return res.status(400).send("Email already exists!");
    const salt= await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(req.body.password,salt)
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash
        });
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

//handling login requests
route.post('/login',async (req,res)=>{
    const {error}=loginvalidation(req.body)
    if(error) return res.status(400).send(error.details);
    const user=await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send("Email not found!");
    const pass=await bcrypt.compare(req.body.password,user.password)
    if(!pass) return res.status(400).send("Invalid Password")
    res.send("Logged in")
})

module.exports = route;
