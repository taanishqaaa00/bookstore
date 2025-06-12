import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Book from './models/bookModel.js'; // Import the Book model
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

const app = express();    //CREATES HTTP SERVER

//json- javascript ubject notation, used to send data in a structured format
app.use(express.json());   //middleware

//get routes-less detail store, more expected, data in url (after ?).(req.query)
//post routes-large data store, structured data in body.(req.body)
//put or patch routes-update data
//delete routes-delete data
// 200s-completed successfully, 400s-client error, 500s-server error


//routes
app.get('/', (req, res) => {
  res.send("first backend app");
});
app.post('/books', async (req, res) => {
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



mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Database connected successfully");
    //port connection
    app.listen(process.env.PORT, (err) => {
        if (err) {
            console.error("Error starting the server");
        }
        console.log("Server is running fine.");
});
})
.catch(() => {
    console.error("DB connection error:");
})