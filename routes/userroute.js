const express = require("express");
const router = express.Router();

const {createuser,getAllUser,updateUser,deleteUser} = require("../controllers/usercontroller");
const cache = require("../controllers/cachecontroller");



router.post("/createuser", createuser);   // Create a new address

router.get("/", cache(60), getAllUser);

router.put("/:user_id", updateUser);

router.delete("/:user_id",deleteUser)



module.exports = router;
