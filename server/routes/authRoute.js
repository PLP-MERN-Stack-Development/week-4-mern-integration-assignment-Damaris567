const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


//Register
router.post("/register", async(req, res) => {
    try {
        const {username, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hashSync(password, salt);
        const newUser = new User({
            username, email, password:hashedpassword
        });
        const savedUser = await newUser.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json(error)
    }
})


//Login
router.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if(!user) {
            return res.status(404).json({message: "User not found"})
        }

        const match = await bcrypt.compare(req.body.password, user.password)
        if(!match) {
            return res.status(404).json({message: "Wrong password"})
        }

        const token = jwt.sign({_id: user._id, username:user.username, email:user.email}, process.env.SECRET, {expiresIn: "3d"})
        const {password, ...info} = user._doc
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,      // false for localhost
            sameSite: 'lax'     // lax for local dev
        }).status(200).json(info)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Logout
router.get("/logout", async(req, res) => {
    try {
        res.clearCookie("token", { sameSite: 'lax', secure: false }).status(200).send("user logged out successfully")
    } catch (error) {
        res.status(500).json(error)
    }
})

//Refetch
router.get("/refetch", async(req, res) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return res.status(401).json({ message: "No token, not authenticated" });
        }
        
        jwt.verify(token, process.env.SECRET, {}, async(err, data) => {
            if(err){
                return res.status(401).json({ message: "Invalid or expired token" });
            }
            res.status(200).json(data);
        });
    } catch (error) {
        console.error('Refetch error:', error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports =router