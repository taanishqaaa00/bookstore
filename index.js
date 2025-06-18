//leetcode75-DSA

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Book from './models/bookModel.js'; // Import the Book model
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file
import bookRoutes from './route/bookRoutes.js'; // Import book routes

const app = express();    //CREATES HTTP SERVER

//json- javascript ubject notation, used to send data in a structured format
app.use(express.json());   //middleware

//get routes-less detail store, more expected, data in url (after ?).(req.query)
//post routes-large data store, structured data in body.(req.body)
//put or patch routes-update data
//delete routes-delete data
// 200s-completed successfully, 400s-client error, 500s-server error


//routes
app.use('/book', bookRoutes); // Use book routes for /books endpoint
app.get('/', (req, res) => {
  res.send("first backend app");
}); 

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