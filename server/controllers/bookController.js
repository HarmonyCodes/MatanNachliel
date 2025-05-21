const Book = require("../models/Book")
const createNewBook= async(req, res)=>{
    const{name, author, subject, category, notes, image}= req.body
    if(!name){
        return res.status(400).json({message: 'name is required'})
    }
    if(!author){
        return res.status(400).json({message: 'author is required'})
    }
    if(!subject){
        return res.status(400).json({message: 'subject is required'})
    }
    if(!category){
        return res.status(400).json({message: 'category is required'})
    }

    const book= await Book.create({name, author, subject, category, notes, image})
    if(book){
        return res.status(201).json({ message: 'New book created'})
    }
    else{
        return res.status(400).json({ message: 'Invalid book'})
    }
}

const getAllBooks= async(req,res)=>{
    const books=await Book.find().lean()
    if(!books?.length){
        return res.status(400).json({message: 'No book found'})
    }
    res.json(books)
}

const updateBook= async(req,res)=>{
    const {_id,name, author, subject, category, notes, image}= req.body
    if(!_id||!name||!author||!subject||!category){
        return res.status(400).json({message: 'fields are required'})
    }
    const book= await Book.findById(_id).exec()
    if(!book){
        return res.status(400).json({ message: 'Book not found'})
    }
    required.name= name
    required.author= author
    required.subject= subject
    required.category= category
    required.notes= notes
    required.image= image
    const updateBook= await book.save()
    res.json(`'${updateBook.name}'update`)
}

const deleteBook= async(req,res)=>{
    const {id}= req.body
    if(!id){
        return res.status(400).json({message: 'ID required'})
    }
    const book= await Book.findById(id).exec()
    if(!book){
        return res.status(400).json({message: 'Book not found'})
    }
    const result= await book.deleteOne()
    const reply= `Book '${result.name}' ID '${result._id}' deleted`
    res.json(reply)
}

const getBookByName= async(req,res)=>{
    const {name}= req.body
    if(!name){
        return res.status(400).json({ message: 'Name is required'})
    }
    const book= await Book.find({name}).lean()
    if(!book){
        return res.status(400).json({ message: 'Book not found'})
    }
    res.json(book)
}
const getBookByAuthor= async(req,res)=>{
    const {author}= req.body
    if(!author){
        return res.status(400).json({ message: 'Author is required'})
    }
    const book= await Book.find({author}).lean()
    if(!book){
        return res.status(400).json({ message: 'Book not found'})
    }
    res.json(book)
}
const getBookByCategory= async(req,res)=>{
    const {category}= req.body
    if(!category){
        return res.status(400).json({ message: 'Category is required'})
    }
    const book= await Book.find({category}).lean()
    if(!book){
        return res.status(400).json({ message: 'Book not found'})
    }
    res.json(book)
}

const getBookById= async(req,res)=>{
    const {id}= req.params
    const book= await Book.findById(id).lean()
    if(!book){
        return res.status(400).json({ message: 'Book not found'})
    }
    res.json(book)
}

module.exports = {
    getAllBooks,
    createNewBook,
    getBookById,
    getBookByName,
    getBookByAuthor,
    getBookByCategory,
    updateBook,
    deleteBook,
    }