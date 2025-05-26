const express = require("express")
const verifyJWT = require("../middleware/verifyJWT")

const BooksToBuyRouter = express.Router()
const BookToBuyController= require("../controllers/bookToBuyController")

BooksToBuyRouter.get("/",BookToBuyController.getAllBooksToBuy)
BooksToBuyRouter.get("/:id", BookToBuyController.getBookToBuyById)
BooksToBuyRouter.get("/priceRange", BookToBuyController.getByPriceRange)
BooksToBuyRouter.post("/",verifyJWT, BookToBuyController.createNewBookToBuy)
BooksToBuyRouter.delete("/",verifyJWT,BookToBuyController.deleteBookToBuy)
BooksToBuyRouter.put("/",verifyJWT,BookToBuyController.updateBookToBuy)

module.exports = BooksToBuyRouter