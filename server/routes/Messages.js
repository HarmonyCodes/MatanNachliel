const express = require("express")
const verifyJWT = require("../middleware/verifyJWT")

const MessagesRouter = express.Router()
const MessageController= require("../controllers/messageController")
MessagesRouter.get("/",verifyJWT,MessageController.getAllMessages)
MessagesRouter.get("/:id",verifyJWT, MessageController.getMessageById)
MessagesRouter.get("/subject",verifyJWT, MessageController.getBySubject)
MessagesRouter.post("/", MessageController.createNewMessage)
MessagesRouter.delete("/",verifyJWT,MessageController.deleteMessage)
//MessagesRouter.put("/",MessageController.updateMessage)
module.exports = MessagesRouter

module.exports = DonorsRouter