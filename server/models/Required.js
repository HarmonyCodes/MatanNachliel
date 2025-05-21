const mongoose= require('mongoose')
const requiredSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    author:{
        type:String,
        required:true
    }
})
const Required = mongoose.model('Required', requiredSchema)