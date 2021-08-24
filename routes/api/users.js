const express = require('express');
const router = express.Router();
const {check,validationResult}=require('express-validator');
const User =require('../../models/User');
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
router.post('/',[
    check('name','Name is required.')
    .not()
    .isEmpty(),
    check('email','Please include a valid Email address')
    .isEmail(),
    check('password','Please enter a passsword with 6 nor more characters')
    .isLength({min: 6})

], async(req,res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
       
    }
    const {name,email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(user){
            res.status(400).json({errors:[{meg:'User Already Exists'}]});
        }
        const avatar =gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'

        })
        user=new User({
            name,
            email,
            avatar,
            password

        });
        const salt=await bcrypt.genSalt(10);
        user.password=await bcrypt.hash(password,salt);
        await user.save();


    res.send('User Register')
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');

    }



});


module.exports=router;