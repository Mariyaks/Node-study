const express = require("express");

const { createAddress,getAllAddresses} = require("../controllers/addresscontroller");


const router = express.Router();

// Create a new address
router.post("/createAddress", createAddress);

// Get a single address by user_id
router.get("/users/",getAllAddresses);

module.exports = router;
