const db = require('../models');

 const createuser = async (req, res) => {
    const {name,email,phone,password} = req.body;
    try {
        const user = await db.user.create({
            name,
            email,
            phone,
            password
        });
        res.status(201).json({ message: "User registration created successfully.", user });
    } catch (error) {
        console.log("stack trace:", error.stack);
        res.status(500).json({ message: "Error creating address.", error });
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


 module.exports ={createuser,getAllUser,updateUser,deleteUser}