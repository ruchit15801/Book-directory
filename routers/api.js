const express = require('express')
const router = express.Router()
const bookmodel = require('../model/book_model')


router.get('/Books' , async (req, res) => {
    const bookList = await bookmodel.find()
    console.log(bookList);
    res.send(bookList)
})

router.get('/Books/:id' ,async(req,res) => {
    const { id } = req.params
    const book = await bookmodel.findOne({ year : id })
    if(!book) return res.send('Book Not Found')
    res.send(book)
} )

router.post('/Books' ,async (req, res) => {
    const title = req.body.title
    const year = req.body.year
    const auother = req.body.auother
    const bookExist = await bookmodel.findOne({ year : year })
    if(bookExist) return res.send('Book already exist')
    var data = await bookmodel.create({title,year,auother})
    data.save()
    res.send("Book Uploaded")
})

router.patch('/Books/:id', async (req, res) => {
    const { id } = req.params;
    const {
        title,
        auother,
    } = req.body;
    const bookExist = await bookmodel.findOne({year : id});
    if (!bookExist) return res.send('Book Do Not exist');
    const updateField = (val, prev) => !val ? prev : val;
    const updatedBook = {
        ...bookExist ,
        title: updateField(title, bookExist.title),
        auother: updateField(auother, bookExist.auother),
        
    };
    await bookmodel.updateOne({year: id},{$set :{title : updatedBook.title, auother: updatedBook.auother}})
    
    res.status(200).send("Book Updated");
})

router.delete('/Books/:id', async (req, res) => {
    const { id } = req.params
    const bookExist = await bookmodel.findOne({isbn : id});
    if (!bookExist) return res.send('Book Do Not exist');
   await bookmodel.deleteOne({ year : id }).then(() =>{
        console.log("Data deleted"); // Success
        res.send("Book Record Deleted Successfully")
    }).catch((error) => { 
        console.log(error); // Failure
    });
})

module.exports = router