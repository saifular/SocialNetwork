const express = require('express');
const router = express.Router();
const {check,validationResult}=require('express-validator/check');

router.post('/',[
    check('name','Name is required.')
    .not()
    .isEmpty(),
    check('email','Please include a valid Email address')
    .isEmail(),
    check('password','Please enter a passsword with 6 nor more characters')
    .isLength({min: 6})

], (req,res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
       
    }
    res.send('User Route')

});


module.exports=router;