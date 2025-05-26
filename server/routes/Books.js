const express = require("express")
const verifyJWT = require("../middleware/verifyJWT")

const BooksRouter = express.Router()
const BookController= require("../controllers/bookController")

BooksRouter.get("/",BookController.getAllBooks)
BooksRouter.get("/:id", BookController.getBookById)
BooksRouter.get("/name", BookController.getBookByName)
BooksRouter.get("/authror", BookController.getBookByAuthor)
BooksRouter.get("/category", BookController.getBookByCategory)
BooksRouter.get("/code", BookController.getBookByCode)
BooksRouter.get("/subject", BookController.getBookBySubject)
BooksRouter.post("/",verifyJWT, BookController.createNewBook)
BooksRouter.delete("/",verifyJWT,BookController.deleteBook)
BooksRouter.put("/",verifyJWT,BookController.updateBook)
module.exports = BooksRouter