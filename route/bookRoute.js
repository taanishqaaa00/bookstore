import express from 'express';
import Book from '../models/models.js';

const router = express.Router();

router.post ('/addbooks', async (req, res) => {
    const { title, author, genre, publishedDate } = req.body;
    const newbook = new Book({title, author, genre, publishedDate});
    try {
        await newbook.save();
        res.status(201).json({message: "Book added successfully"});
    } 
    catch (error) {
        res.status(400).json({message: "Error adding book", error: error.message});
    }
})

export default router;

