const express = require("express")
const RequiredsRouter = express.Router()
const RequiredController= require("../controllers/requiredController")

RequiredsRouter.get("/",RequiredController.getAllRequireds)
RequiredsRouter.get("/:id", RequiredController.getRequiredById)
RequiredsRouter.get("/priceRange", RequiredController.getByPriceRange)
RequiredsRouter.post("/", RequiredController.createNewRequired)
RequiredsRouter.delete("/",RequiredController.deleteRequired)
RequiredsRouter.put("/",RequiredController.updateRequired)

module.exports = RequiredsRouter