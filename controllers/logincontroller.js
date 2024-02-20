const db = require('../models')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../config/utils/auth');
require('dotenv').config();


// const generateTokens = (user) => {
//   const payload = {
//     userId: user.id, // Use the user's ID from the database
//     email: user.email,
//     role: user.role, // Assuming you have a 'role' property in your user model
//   };

//   // Generate an access token with a short expiration (15 minutes)
//   const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: '15m',
//   });

//   const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
//     expiresIn: '7d',
//   });

//   return { accessToken, refreshToken };
// };


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
      const login = await db.user.findOne({
          where : {
              email:email,
          }
      });

      if (!login) {
          return res.status(401).json({ message: "Invalid email or password." });
      }

      const passwordMatch = await bcrypt.compare(password, login.password);

      if (passwordMatch) {

        const accessToken = await generateAccessToken(login);
        // If passwords match, login is successful
        return res.status(200).json({ message: "Login successful.", login, accessToken });
      } else {
        // If passwords don't match, login failed
        return res.status(401).json({ message: "Invalid email or password." });
      }
    } catch (error) {
      console.log("stack trace:", error.stack);
      return res.status(500).json({ message: "Error during login.", error });
    }
  };


  module.exports = { login }