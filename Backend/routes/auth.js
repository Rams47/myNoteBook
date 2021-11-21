const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Create a user using: POST "/api/auth/". Doesnt require auth
router.get('/',[
    body('name',"Enter a valid name").isLength({min: 3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password must be atleast 5 characters").isLength({min: 5}),
],(req,res)=>{

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email

    }).then(user => res.json(user))
    .catch(err=> console.log(err),
    res.json({error: 'Please unique value for email'}));
    

   
});

module.exports = router;