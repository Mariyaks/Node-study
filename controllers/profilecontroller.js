const db = require('../models')
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads'); // Specify the destination folder for storing uploaded images
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const fileExtension = file.originalname.split('.').pop();
      cb(null, 'image-' + uniqueSuffix + '.' + fileExtension);
  },
  });

  const Filter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only image files are allowed.'));
    }
    };
  
  const upload = multer({ storage,Filter });

const createProfile = async (req, res) => {
    
    const { firstname,lastname,address,dob,phone,gender,email } = req.body;
    const profile_pc = req.file.filename;             // Assuming req.file has the uploaded file information
    const imageUrl = `/uploads/${profile_pc}`;
    try {
        const profile = await db.profile_tbl.create({
            firstname,
            lastname,
            address,
            dob,
            phone,
            gender,
            email,
            profile_pic: imageUrl,
        });
    
        res.status(201).json({ message: "Profile created successfully.", profile, imageUrl });
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


