const Required = require("../models/Required")
const createNewRequired = async (req, res) => {
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

    const required = await Required.create({ name, price, author })
    if (required) {
        return res.status(201).json({ message: 'New required created' })
    }
    else {
        return res.status(400).json({ message: 'Invalid required' })
    }
}

const getAllRequireds = async (req, res) => {
    const requireds = await Required.find().lean()
    if (!requireds?.length) {
        return res.status(400).json({ message: 'No required found' })
    }
    res.json(requireds)
}

const updateRequired = async (req, res) => {
    const { _id, name, price, author } = req.body
    if (!_id || !name || !price || !author) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const required = await Required.findById(_id).exec()
    if (!required) {
        return res.status(400).json({ message: 'Required not found' })
    }
    required.name = name
    required.price = price
    required.author = author
    const updateRequired = await required.save()
    res.json(`'${updateRequired.name}'update`)
}

const deleteRequired = async (req, res) => {
    const { id } = req.body
    if (!id) {
        return res.status(400).json({ message: 'ID required' })
    }
    const required = await Required.findById(id).exec()
    if (!required) {
        return res.status(400).json({ message: 'Required not found' })
    }
    const result = await required.deleteOne()
    const reply = `Required '${result.name}' ID '${result._id}' deleted`
    res.json(reply)
}

const getRequiredById = async (req, res) => {
    const { id } = req.params
    const required = await Required.findById(id).lean()
    if (!required) {
        return res.status(400).json({ message: 'Required not found' })
    }
    res.json(required)
}
const getByPriceRange = async (req, res) => {
    const { minPrice, maxPrice } = req.body
    const min = Number(minPrice);
    const max = Number(maxPrice);
    if (isNaN(min) || isNaN(max)) {
        return res.status(400).json({ message: 'Invalid price range' });
    }
    const required = await Required.find({ price: { $gte: min, $lte: max } }).lean()
    if (!required) {
        return res.status(400).json({ message: 'Required not found' })
    }
    res.json(required)
}

module.exports = {
    getAllRequireds,
    createNewRequired,
    getRequiredById,
    getByPriceRange,
    updateRequired,
    deleteRequired
}