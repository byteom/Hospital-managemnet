const Hospital = require("../models/Hospital");

// Task 1: Create Hospital
const createHospital = async (req, res) => {
  const { name, city, image, specialty, rating } = req.body;
  try {
    const hospital = new Hospital({ name, city, image, specialty, rating });
    await hospital.save();
    res.status(201).json(hospital);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Task 2: Get Hospitals by City
const getHospitalsByCity = async (req, res) => {
  const { city } = req.query;
  try {
    const hospitals = await Hospital.find({ city });
    res.status(200).json(hospitals);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Task 3: Delete Hospital
const deleteHospital = async (req, res) => {
  const { id } = req.query;
  try {
    await Hospital.findByIdAndDelete(id);
    res.status(200).json({ message: "Hospital deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Task 4: Update Hospital
const updateHospital = async (req, res) => {
  const { id } = req.query;
  try {
    const hospital = await Hospital.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(hospital);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Task 5: Add Hospital Details
const addHospitalDetails = async (req, res) => {
  const { id } = req.query;
  const { details } = req.body;
  try {
    const hospital = await Hospital.findByIdAndUpdate(id, { details }, { new: true });
    res.status(200).json(hospital);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createHospital,
  getHospitalsByCity,
  deleteHospital,
  updateHospital,
  addHospitalDetails,
};