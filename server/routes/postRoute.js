const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const verifyToken = require("../verifyToken")

//Create
router.post('/create', verifyToken, async (req, res) => {
    try {
        console.log("Creating post with data:", req.body);
        const newPost = new Post(req.body)
        const savedPost = await newPost.save()
        console.log("Post saved:", savedPost);
        res.status(200).json(savedPost)
    } catch (error) {
        console.log("Error creating post:", error);
        res.status(500).json(error)
    }
})

// Update
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedPost)
    } catch (error) {
        res.status(500).json(error)
    }
})

// Delete
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id)
        await Comment.deleteMany({ PostId: req.params.id })
        res.status(200).json("Post Deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

// Get Post Details
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
})

//Get Posts
router.get('/', async (req, res) => {
    try {
        const searchFilter = {
            title: {$regex: req.query.search, $options:'i'}
        }
        const posts = await Post.find(req.query.search ?
            searchFilter : {})
        console.log("Retrieved posts:", posts.length, "posts");
        posts.forEach((post, index) => {
            console.log(`Post ${index + 1}:`, {
                id: post._id,
                title: post.title,
                photo: post.photo,
                hasPhoto: !!post.photo
            });
        });
        res.status(200).json(posts)
    } catch (error) {
        console.log("Error getting posts:", error);
        res.status(500).json(error)
    }
})

//Get User Post
router.get('/user/:userId', async (req, res) => {
    try {
        const posts = await Post.find({UserId: req.params.userId})
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router