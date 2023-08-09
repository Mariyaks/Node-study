const express = require("express");

const {createuser,getAllUser,updateUser,deleteUser} = require("../controllers/usercontroller");


const router = express.Router();


router.post("/createuser", createuser);   // Create a new address

router.get("/",getAllUser);

router.put("/:user_id", updateUser);

router.delete("/:user_id",deleteUser)



module.exports = router;
