const express = require('express');
const user = require('../models/User');
const router = express.Router();

//Create a user using: POST "/api/auth/". Doesnt require auth
router.get('/',(req,res)=>{

    console.log(req.body);
    const User = user(req.body);
    User.Save();
    res.send(req.body);
});

module.exports = router;