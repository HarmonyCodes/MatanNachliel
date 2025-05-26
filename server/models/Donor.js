const mongoose= require('mongoose')
const donorSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        default: 'בעילום שם'
    },
    email:{
        type:String,
        required:false
    },
    namesToRemember:{
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
const Donor = mongoose.model('Donor', donorSchema)