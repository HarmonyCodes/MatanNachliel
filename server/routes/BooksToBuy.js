const express = require("express")
const BooksToBuyRouter = express.Router()
const BookToBuyController= require("../controllers/bookToBuyController")

BooksToBuyRouter.get("/",BookToBuyController.getAllBooksToBuy)
BooksToBuyRouter.get("/:id", BookToBuyController.getBookToBuyById)
BooksToBuyRouter.get("/priceRange", BookToBuyController.getByPriceRange)
BooksToBuyRouter.post("/", BookToBuyController.createNewBookToBuy)
BooksToBuyRouter.delete("/",BookToBuyController.deleteBookToBuy)
BooksToBuyRouter.put("/",BookToBuyController.updateBookToBuy)

module.exports = BooksToBuyRouter