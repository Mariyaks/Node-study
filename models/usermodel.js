module.exports =(sequelize, DataTypes) => { 
    const User = sequelize.define("User", {
        user_id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
        },
        name: {
        type: DataTypes.STRING,
        allowNull: false
        },
        phone: {
        type: DataTypes.STRING,
        allowNull: true
        },
        email: {
        type: DataTypes.STRING,
        allowNull: true
        },
        password: {
        type: DataTypes.STRING,
        allowNull: true
        },
    },

    
    {
        paranoid: true,
        tableName: 'user',
         createdAt: 'created_at',
         updatedAt:'updated_at',
         deletedAt: 'deleted_at',
        });
    
   
   
    
    
    return User;
    };