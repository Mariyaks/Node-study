const dbconfig = require('../config/dbconfig.js');


const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD, {
        host: dbconfig.HOST,
        dialect: dbconfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbconfig.pool.max,
            min: dbconfig.pool.min,
            acquire: dbconfig.pool.acquire,
            idle: dbconfig.pool.idle

        }
    }
)

sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.user = require('./usermodel')(sequelize, DataTypes)

db.addresses = require('./addressmodel')(sequelize, DataTypes) 
db.profile_tbl = require('./profilemodel')(sequelize, DataTypes) 

//create association 
db.user.hasMany(db.addresses, { 
    foreignKey: 'user_id',
    sourceKey:'user_id', 
    as: 'user'      //association naming
});

db.addresses.belongsTo(db.user, { 
    foreignKey: 'user_id' 
}); 

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

module.exports = db




