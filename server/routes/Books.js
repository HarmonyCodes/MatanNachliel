const express = require("express")
const BooksRouter = express.Router()
const BookController= require("../controllers/bookController")

BooksRouter.get("/",BookController.getAllBooks)
BooksRouter.get("/:id", BookController.getBookById)
BooksRouter.get("/name", BookController.getBookByName)
BooksRouter.get("/authror", BookController.getBookByAuthor)
BooksRouter.get("/category", BookController.getBookByCategory)
BooksRouter.get("/subject", BookController.getBookBySubject)
BooksRouter.post("/", BookController.createNewBook)
BooksRouter.delete("/",BookController.deleteBook)
BooksRouter.put("/",BookController.updateBook)
module.exports = BooksRouter