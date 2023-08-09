const db = require('../models')
const bcrypt = require('bcrypt');




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
        // If passwords match, login is successful
        return res.status(200).json({ message: "Login successful.", login });
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