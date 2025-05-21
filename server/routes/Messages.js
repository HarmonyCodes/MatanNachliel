const express = require("express")
const MessagesRouter = express.Router()
const MessageController= require("../controllers/messageController")
MessagesRouter.get("/",MessageController.getAllMessages)
MessagesRouter.get("/:id", MessageController.getMessageById)
MessagesRouter.get("/subject", MessageController.getBySubject)
MessagesRouter.post("/", MessageController.createNewMessage)
MessagesRouter.delete("/",MessageController.deleteMessage)
MessagesRouter.put("/",MessageController.updateMessage)
module.exports = MessagesRouter

module.exports = DonorsRouter