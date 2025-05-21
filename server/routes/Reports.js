const express = require("express");
const router = express.Router();
const { exportBooksToExcel, exportBooksToPDF } = require("../controllers/reportController");

router.get("/excel", exportBooksToExcel);
router.get("/pdf", exportBooksToPDF);

module.exports = router;