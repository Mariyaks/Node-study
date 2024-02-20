const express = require("express");
const router = express.Router();

const { sendLoginEmail } = require("../controllers/checkoutcontroller");


// Create a new address

router.post('/checkout', sendLoginEmail);

// Get a single address by user_id

module.exports = router;



