const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

//Create a user using: POST "/api/auth/createuser". no login required
router.post('/createuser',[
    body('name',"Enter a valid name").isLength({min: 3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password must be atleast 5 characters").isLength({min: 5}),
],async (req,res)=>{

    // if there are errors return the bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
    //check weather the User with email exist already
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: "Sorry user with email already exist"})
    }
    user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email

    })
    // .then(user => res.json(user)
    // .catch(err=> console.log(err),
    // res.json({error: 'Please unique value for email'}));
    
    res.json(user);
} catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
}
   
});

module.exports = router;