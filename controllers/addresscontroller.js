const db = require('../models')

const createAddress = async (req, res) => {
    
    const { address_type,user_id, street, city, state, country, postal_code, name,phone } = req.body;
    try {
        const address = await db.addresses.create({
         user_id,
         address_type,
         street,
         city,
         state,
         country,
         postal_code,
         name,
         phone
        });
    
        res.status(201).json({ message: "Address created successfully.", address });
    } catch (error) {
        console.log("stack trace:", error.stack);
        res.status(500).json({ message: "Error creating address.", error });
    }
};

    const getAllAddresses = async (req, res) => {
        try {
            const userAddresses = await db.addresses.findAll();
        
            if (userAddresses.length === 0) {
             res.status(404).json({ message: "No addresses found for the user." });
            } else {
             res.status(200).json({ message: "Addresses retrieved successfully.", data: { userAddresses } });
            }
        } catch (error) {
            console.error('Error:', error.message);
            console.error('Stack trace:', error.stack);
            res.status(500).json({ message: "Error retrieving addresses.", error });
        }
        };

    module.exports ={createAddress,getAllAddresses} 