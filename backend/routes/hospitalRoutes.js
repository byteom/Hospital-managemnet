const express = require("express");
const {
  createHospital,
  getHospitalsByCity,
  deleteHospital,
  updateHospital,
  addHospitalDetails,
} = require("../controllers/hospitalController");

const router = express.Router();

// Task 1: Create Hospital
router.post("/create", createHospital);

// Task 2: Get Hospitals by City
router.get("/", getHospitalsByCity);

// Task 3: Delete Hospital
router.delete("/delete", deleteHospital);

// Task 4: Update Hospital
router.put("/update", updateHospital);

// Task 5: Add Hospital Details
router.post("/details", addHospitalDetails);

module.exports = router;