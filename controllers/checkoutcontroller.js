const db = require("../models");
const getLocalisedString = require('../config/utils/localisationHandler');
const { Service } = require('../config/utils/orderEmail');

const sendLoginEmail = async (userEmail, userName) => {
    try {
        const params = {
            name: userName,
        };
        
        // Assuming you have a method to get the localized email content for user login
        const emailContent = getLocalisedString('en', 'known_key', params);
        
        // Assuming you have a method to send emails
        await Service.sendEmail(userEmail, 'Welcome Back!', emailContent);

        console.log('Login email sent successfully.');
    } catch (error) {
        console.error('Error sending login email:', error);
    }
};


module.exports = {
    sendLoginEmail
};



