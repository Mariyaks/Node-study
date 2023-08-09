const express = require('express')


const { sequelize } = require('./models');

const path = require('path');

const app = express();

// Parse incoming request data as JSON
app.use(express.json());

// Parse incoming request data as URL-encoded
app.use(express.urlencoded({ extended: true }));


app.use('/api/users/', require('./routes/userroute'))
app.use('/api/users/', require('./routes/loginroute'))

app.use('/api/addresses', require('./routes/addressrotue'))
app.use('/api/profile_tbl', require('./routes/profileroute'))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const port = 8008;
// const localIpAddress = getLocalIpAddress();

// function getLocalIpAddress() {
//     const interfaces = require('os').networkInterfaces();
//     for (const interfaceName in interfaces) {
//       const networkInterface = interfaces[interfaceName];
//       for (const address of networkInterface) {
//         if (address.family === 'IPv4' && !address.internal) {
//           return address.address;
//         }
//       }
//     }
//     return 'localhost'; 
// }


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    }); 

    





