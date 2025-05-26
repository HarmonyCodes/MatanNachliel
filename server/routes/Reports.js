const express = require("express");
const verifyJWT = require("../middleware/verifyJWT")

const router = express.Router();
const { exportBooksToExcel, exportBooksToPDF } = require("../controllers/reportController");

router.get("/excel", exportBooksToExcel);
router.get("/pdf", exportBooksToPDF);

module.exports = router;