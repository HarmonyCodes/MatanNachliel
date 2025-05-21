const Donor = require("../models/Donor")
const createNewDonor= async(req, res)=>{
    const{name, email, namesToRemember, phone, comments}= req.body
    if(!name){
        return res.status(400).json({message: 'name is required'})
    }
    if(!namesToRemember){
        return res.status(400).json({message: 'namesToRemember is required'})
    }
    if(!phone){
        return res.status(400).json({message: 'phone is required'})
    }

    const donor= await Donor.create({name, email, namesToRemember, phone, comments})
    if(donor){
        return res.status(201).json({ message: 'New donor created'})
    }
    else{
        return res.status(400).json({ message: 'Invalid donor'})
    }
}

const getAllDonors= async(req,res)=>{
    const donors=await Donor.find().lean()
    if(!donors?.length){
        return res.status(400).json({message: 'No donor found'})
    }
    res.json(donors)
}

const updateDonor= async(req,res)=>{
    const {_id,name, email, namesToRemember, phone, comments}= req.body
    if(!_id||!name||!namesToRemember||!phone){
        return res.status(400).json({message: 'fields are required'})
    }
    const donor= await Book.findById(_id).exec()
    if(!donor){
        return res.status(400).json({ message: 'Donor not found'})
    }
    donor.name= name
    donor.email= email
    donor.namesToRemember= namesToRemember
    donor.phone= phone
    donor.comments= comments
    const updateDonor= await donor.save()
    res.json(`'${updateDonor.name}'update`)
}

const deleteDonor= async(req,res)=>{
    const {id}= req.body
    if(!id){
        return res.status(400).json({message: 'ID required'})
    }
    const donor= await Donor.findById(id).exec()
    if(!donor){
        return res.status(400).json({message: 'Donor not found'})
    }
    const result= await donor.deleteOne()
    const reply= `Donor '${result.name}' ID '${result._id}' deleted`
    res.json(reply)
}

const getDonorById= async(req,res)=>{
    const {id}= req.params
    const donor= await Book.findById(id).lean()
    if(!donor){
        return res.status(400).json({ message: 'Donor not found'})
    }
    res.json(donor)
}

const getDonorByName= async(req,res)=>{
    const {name}= req.body
    if(!name){
        return res.status(400).json({ message: 'Name required'})
    }
    const donor= await Book.find({name}).lean()
    if(!donor){
        return res.status(400).json({ message: 'Donor not found'})
    }
    res.json(donor)
}

module.exports = {
    getAllDonors,
    createNewDonor,
    getDonorById,
    getDonorByName,
    updateDonor,
    deleteDonor
    }