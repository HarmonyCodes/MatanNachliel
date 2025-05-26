const BookToBuy = require("../models/BookToBuy")
const createNewBookToBuy = async (req, res) => {
    const { name, price, author } = req.body
    if (!name) {
        return res.status(400).json({ message: 'name is required' })
    }
    if (!price) {
        return res.status(400).json({ message: 'price is required' })
    }
    if (!author) {
        return res.status(400).json({ message: 'author is required' })
    }

    const bookToBuy = await BookToBuy.create({ name, price, author })
    if (bookToBuy) {
        return res.status(201).json({ message: 'New bookToBuy created' })
    }
    return res.status(400).json({ message: 'Invalid bookToBuy' })
}

const getAllBooksToBuy = async (req, res) => {
    const booksToBuy = await BookToBuy.find().lean()
    if (!booksToBuy?.length) {
        return res.status(400).json({ message: 'No BookToBuy found' })
    }
    res.json(booksToBuy)
}

const updateBookToBuy = async (req, res) => {
    const { _id, name, price, author } = req.body
    if (!_id && (!name || !price || !author)) {
        return res.status(400).json({ message: 'fields are bookToBuy' })
    }
    const bookToBuy = await BookToBuy.findById(_id).exec()
    if (!bookToBuy) {
        return res.status(400).json({ message: 'BookToBuy not found' })
    }
    bookToBuy.name = name
    bookToBuy.price = price
    bookToBuy.author = author
    const updateBookToBuy = await bookToBuy.save()
    res.json(`'${updateBookToBuy.name}'update`)
}

const deleteBookToBuy = async (req, res) => {
    const { id } = req.params
    if (!id) {
        return res.status(400).json({ message: 'ID required' })
    }
    const bookToBuy = await BookToBuy.findById(id).exec()
    if (!bookToBuy) {
        return res.status(400).json({ message: 'BookToBuy not found' })
    }
    const result = await bookToBuy.deleteOne()
    res.json(`BookToBuy '${result.name}' ID '${result._id}' deleted`)
}

const getBookToBuyById = async (req, res) => {
    const { id } = req.params
    const bookToBuy = await BookToBuy.findById(id).lean()
    if (!bookToBuy) {
        return res.status(400).json({ message: 'BookToBuy not found' })
    }
    res.json(bookToBuy)
}

const getByPriceRange = async (req, res) => {
    const { minPrice, maxPrice } = req.query
    if (!minPrice || !maxPrice) {
        return res.status(400).json({ message: 'minPrice and maxPrice are required' })
    }
    const bookToBuy = await BookToBuy.find({
        price: { $gte: minPrice, $lte: maxPrice }
    }).lean()
    if (!bookToBuy || booksToBuy.length === 0) {
        return res.status(400).json({ message: 'No bookToBuy found in this price range' })
    }
    res.json(bookToBuy)
}

module.exports = {
    getAllBooksToBuy,
    createNewBookToBuy,
    getBookToBuyById,
    getByPriceRange,
    updateBookToBuy,
    deleteBookToBuy
}