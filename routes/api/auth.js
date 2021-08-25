const express = require('express');
const router = express.Router();
const auth=require('../../middleware/auth');
const User=require('../../models/User');
const {check,validationResult}=require('express-validator');
const config=require('config');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
router.get('/',auth,async(req,res)=>{
    try{
        const user=await User.findById(req.user.id).select('-password');
        res.json(user);

        
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');

    }


} );
router.post('/',[
    check('email','Please include a valid Email address')
    .isEmail(),
    check('password','Please enter a passsword with 6 nor more characters')
    .exists()

], async(req,res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
       
    }
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
           return res.status(400).json({errors:[{meg:'User Not Found'}]});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{meg:'Password Not Match'}]});
        }
        

        const payload={
            user:{
                id:user.id
            }
        }
        jwt.sign(payload,
            config.get('jwtSecret'),
            {expiresIn:36000},
            (err,token)=>{
                if(err) throw err;
                res.json({token});

            }
            );
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server error');

    }



});


module.exports=router;