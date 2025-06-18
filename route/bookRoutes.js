import express from 'express';
import mongoose from 'mongoose';
import Books from '../models/bookModel.js';

const router = express.Router();

router.get('/allbooks/:id',async  (req,res)=>{
    try{
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.json({ message: 'INVALID BOOK ID'});
            return;
        }
        const currBook = await Book.findById(id);
        if (!currBook) {
            return res.status(400).json ({message: 'book not found'}) ;
        }
        res.status(200).json(currBook);
    } catch (error) {
        res.status(500).json ({message: 'error fetching book', error: error.message});
    }
    })

router.get('/allbooks', async(req,res)=>{
    try{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        const skip = (page-1)*limit;

        const books = await Books.find().skip(skip).limit(limit);

        const totalBooks = await Books.countDocuments();

        const totalPages = Math.ceil(totalBooks/limit);

        res.status(200).json({books,pagination :{
                currentpage: page, totalPages, totalBooks
            }
        });
    }
    catch(error){
        res.status(500).json({message: "Error fetching the books", error: error.message})
    }
});

router.post('/addbook',async (req,res)=>{
    const {title,author,genre,publishedDate} = req.body;

    const newBook = new Books({title,author,genre,publishedDate});

    try{
        await newBook.save();

        res.status(201).json({message: "Book is added successfully"});
    }
    catch(error){
        res.status(400).json({message: "Book Couldnot be added",error: error.message});
    }
})

export default router;