const express = require('express');
const zod = require('zod');
const {User} = require('../db/db');
const jwt = require("jsonwebtoken")
const router = express.Router();
const {JWT_SECRET} = require('../config');

// sign up and sing in routes 

const signupSchema = zod.object({
    username : zod.string().email(),
    firstname : zod.string(),
    lastname : zod.string(),
    password : zod.string().min(8),

})

router.post('/signup', async (req, res) => {
    const result = signupSchema.safeParse(req.body);
    if(!result.success) {
        return res.status(400).json({message : "Invalid request"});
    }

    // check if the mail already exist 
    const mailExist = await User.exists({ username: req.body.username });
    if (mailExist) {
        return res.status(400).json({ message: "Email already taken" });
    }


    const user = await User.create({
        username : req.body.username,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        password : req.body.password
    });

    // get the id
    const userID = user._id;

    // create the token 
    const token = jwt.sign(
        {
            userID
        }, JWT_SECRET
    );

    res.json({
        message: "User created",
        token: token
    })

})


module.exports = router;
