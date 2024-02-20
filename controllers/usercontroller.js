const db = require('../models');
const bcrypt = require('bcrypt');
const { generateAccessToken } = require('../config/utils/auth');
const getLocalisedString = require('../config/utils/localisationHandler');
const { Service } = require('../config/utils/orderEmail');

// // Function to generate an access token
// const generateAccessToken = (user) => {
//     const payload = {
//       userId: user.user_id,
//       email: user.email,
//     //   role: user.role,
//     };
  
//     const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
//       expiresIn: '15m', // Set your desired expiration time
//     });
  
//     return accessToken;
//   };

const userprofile = async (req, res) => {

    console.log('test');
    const { name, email, password, phone } = req.body;
    
         try {
            const hasUserWithEmail = await db.user.count({ where: { email } })
            if (hasUserWithEmail) {
             res.status(400).json({ message: ' existing user.',hasUserWithEmail });
             return
            }else{
    
             res.status(400).json({ message: ' Nonexisting user.' });
    
            }
         } catch (error) {
            res.status(500).json({ message: 'Error creating user.', error });
         }
    };
             
const createuser = async (req, res) => {
    const { role, name, email, phone, password } = req.body;
        try {
            const hasUserWithEmail = await db.user.count({ where: { email } })
            if (hasUserWithEmail) {
             res.status(400).json({ message: 'Already existing user.' });
             return
            }
            else if(!password || password === null) {
             return res.status(400).json({ message: 'Password is Missing.' });
             
            }
             else{
    
            const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.user.create({
            role,
            name,
            email,
            phone,
            password: hashedPassword
        });
        const accessToken = await generateAccessToken(user);
        const userEmail = 'mariyakarekkattu@gmail.com'; 
        if (userEmail) {
            const params = {
                userName: user.name,
            };
            const emailContent = getLocalisedString('en', 'admin_notification_stouck_v1', params);
            await emailService.sendEmail(userEmail, 'Insufficient Variant Quantity', emailContent);
          }
        res.status(200).json({ message: 'registration successful.', user ,accessToken})
    } 
    } catch (error) {
        console.log("stack trace:", error.stack);
        res.status(500).json({ message: "Error creating user.", error });
    }
}


 const getAllUser = async (req, res) => {
    try {
        const alluser = await db.user.findAll();
    
        if (alluser.length === 0) {
         res.status(404).json({ message: "No Users found for the user." });
        } else {
         res.status(200).json({ message: "User retrieved successfully.", data: { alluser } });
        }
    } catch (error) {
        console.error('Error:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({ message: "Error retrieving user.", error });
    }
};

const updateUser = async (req, res) => {
    const { user_id } = req.params;  
    const{name,email,phone,password} = req.body;
    try{
        const users = await db.user.findOne({where:{user_id}})
        if(!users)
        {
            return res.status(404).json({message: "User not found"});
        }

        await users.update({
            name: name,
            email: email,
            phone: phone,
            password: password,
          });

        // const updateuser = await db.user.update({

        //     updateuser:name=name,
        //     updateuser:email=email,
        //     updateuser:phone=phone,
        //     updateuser:password=password,
        // });
        
        res.status(200).json({message:"User Updated successfully", users});
    }catch(error){
        console.log("updateuser");
        console.error('Error:', error.message);
        console.error('Stack trace:', error.stack);
        res.status(500).json({message: "error Updating user",error});
    }
};

const deleteUser = async (req, res) => {
    const {user_id} = req.params;
    try {
      const users = await db.user.findOne({ where:{user_id}});
      if (!users) {
        return res.status(404).json({ message: "User not found" });
      }
    
    await users.destroy();
  
      res.status(200).json({ message: "User deleted successfully", users});
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

 


 module.exports ={createuser,getAllUser,updateUser,deleteUser, userprofile, generateAccessToken, }
