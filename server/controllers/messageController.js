const Message = require("../models/Message")
const createNewMessage = async (req, res) => {
    const { name, subject, description, phone, comments } = req.body
    if (!name) {
        return res.status(400).json({ message: 'name is required' })
    }
    if (!subject) {
        return res.status(400).json({ message: 'subject is required' })
    }
    if (!description) {
        return res.status(400).json({ message: 'description is required' })
    }
    if (!phone) {
        return res.status(400).json({ message: 'phone is required' })
    }

    const message = await Message.create({ name, subject, description, phone, comments })
    if (message) {
        return res.status(201).json({ message: 'New message created' })
    }
    return res.status(400).json({ message: 'Invalid message' })
}

const getAllMessages = async (req, res) => {
    const messages = await Message.find().lean()
    if (!messages?.length) {
        return res.status(400).json({ message: 'No message found' })
    }
    res.json(messages)
}

const updateMessage = async (req, res) => {
    const { _id, name, subject, description, phone, comments } = req.body
    if (!_id && (!name || !subject || !description || !phone)) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const message = await Message.findById(_id).exec()
    if (!message) {
        return res.status(400).json({ message: 'Message not found' })
    }
    message.name = name
    message.subject = subject
    message.description = description
    message.phone = phone
    message.comments = comments
    const updateMessage = await message.save()
    res.json(`'${updateMessage.name}'update`)
}

const deleteMessage = async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'ID required' })
    }
    const message = await Message.findById(id).exec()
    if (!message) {
        return res.status(400).json({ message: 'Message not found' })
    }
    const result = await message.deleteOne()
    res.json(`Message '${result.name}' ID '${result._id}' deleted`)
}

const getMessageById = async (req, res) => {
    const { id } = req.params
    const message = await Message.findById(id).lean()
    if (!message) {
        return res.status(400).json({ message: 'Message not found' })
    }
    res.json(message)
}

const getBySubject = async (req, res) => {
    const { subject } = req.query
    if (!subject) {
        return res.status(400).json({ message: 'subject is required' })
    }
    const message = await Message.find({ subject }).lean()
    if (!message) {
        return res.status(400).json({ message: 'Message not found' })
    }
    res.json(message)
}

module.exports = {
    getAllMessages,
    createNewMessage,
    getMessageById,
    getBySubject,
    updateMessage,
    deleteMessage
}