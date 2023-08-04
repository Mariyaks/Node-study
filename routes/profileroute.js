const express = require("express");

const { createProfile,upload} = require("../controllers/profilecontroller");


const router = express.Router();

// Create a new address
router.post("/profile", upload.single('profile_pic'), createProfile);

// Get a single address by user_id

module.exports = router;

