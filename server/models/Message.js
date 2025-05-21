const mongoose= require('mongoose')
const Subject= {
    Donations: "תרומות",
    Questions: "שאלות",
    Comments: "הערות",
    Suggestions: "הצעות",
    Other: "אחר"
};
const massageSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subject:{
        type:String,
        enum: Object.values(Subject),
        required:true
    },
    description:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    comments:{
        type:String,
        required:false
    }
})
const Message = mongoose.model('Message', massageSchema)