const express = require("express")
const DonorsRouter = express.Router()
const DonorController= require("../controllers/donorController")

DonorsRouter.get("/",DonorController.getAllDonors)
DonorsRouter.get("/:id", DonorController.getDonorById)
DonorsRouter.get("/name", DonorController.getDonorByName)
DonorsRouter.post("/", DonorController.createNewDonor)
DonorsRouter.delete("/",DonorController.deleteDonor)
DonorsRouter.put("/",DonorController.updateDonor)

module.exports = DonorsRouter