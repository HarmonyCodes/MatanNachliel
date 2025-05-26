const express = require("express")
const verifyJWT = require("../middleware/verifyJWT")

const DonorsRouter = express.Router()
const DonorController= require("../controllers/donorController")

DonorsRouter.get("/",DonorController.getAllDonors)
DonorsRouter.get("/:id", DonorController.getDonorById)
DonorsRouter.get("/name", DonorController.getDonorByName)
DonorsRouter.post("/",verifyJWT, DonorController.createNewDonor)
DonorsRouter.delete("/",verifyJWT,DonorController.deleteDonor)
DonorsRouter.put("/",verifyJWT,DonorController.updateDonor)

module.exports = DonorsRouter