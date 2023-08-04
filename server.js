const express = require('express')


const { sequelize } = require('./models');

const path = require('path');

const app = express();

// Parse incoming request data as JSON
app.use(express.json());

// Parse incoming request data as URL-encoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/users/', require('./routes/userroute'))
app.use('/api/addresses', require('./routes/addressrotue'))
app.use('/api/profile_tbl', require('./routes/profileroute'))

const port = 8080;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    }); 

    





