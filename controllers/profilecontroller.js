const db = require('../models')
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); // Specify the destination folder for storing uploaded images
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext); // Set a unique filename for the uploaded image
    },
  });
  
  const upload = multer({ storage });

const createProfile = async (req, res) => {
    
    const { firstname,lastname,address,dob,phone,gender,email } = req.body;
    const profile_pic = req.file.filename;
    try {
        const profile = await db.profile_tbl.create({
            firstname,
            lastname,
            address,
            dob,
            phone,
            gender,
            email,
            profile_pic
        });
    
        res.status(201).json({ message: "Profile created successfully.", profile });
    } catch (error) {
        console.log("stack trace:", error.stack);
        res.status(500).json({ message: "Error creating profile.", error });
    }
};

const getAllProfile = async (req, res) => {
  try {
      const userProfile = await db.profile_tbl.findAll();
  
      if (userProfile.length === 0) {
       res.status(404).json({ message: "No profile found for the user." });
      } else {
       res.status(200).json({ message: "profile retrieved successfully.", data: { userProfile } });
      }
  } catch (error) {
      console.error('Error:', error.message);
      console.error('Stack trace:', error.stack);
      res.status(500).json({ message: "Error retrieving addresses.", error });
  }
  };

module.exports = { createProfile,upload, getAllProfile}


