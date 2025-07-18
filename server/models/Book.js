const mongoose = require('mongoose')
const Category = {
    TANACH: `תנ"ך ומפרשיו`,
    FESTIVALS: "מועדים",
    THOUGHT: "מחשבה",
    ETHICS: "מוסר",
    CHASSIDUT: "חסידות",
    HALACHA: "הלכה",
    TALMUD_COMMENTATORS: `מפרשי הש"ס`,
    BAVLI: "תלמוד בבלי",
    YERUSHALMI: "תלמוד ירושלמי",
    MISHNAH: "משניות",
    SIDDURIM: "סידורים",
    MISC: "שונות",
    REFERENCE: "קונקורדנציה, אנציקלופדיות ומילונים"
};
const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        unique: true,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: Object.values(Category),
        required: true
    },
    notes: {
        type: String,
        required: false,
        default: ''
    },
    image: {
        type: String,
        required: false
    },
    donor: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Book', bookSchema)