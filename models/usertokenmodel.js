module.exports =(sequelize, DataTypes) => { 

    const UserToken = sequelize.define("UserToken", {
        usertoken_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
            model: "user",
            key: "user_id",
            },
        },
        token: {
        type: DataTypes.STRING,
        allowNull: false
        },
    },
    {
    paranoid: true,
    tableName: 'usertoken',
        createdAt:'created_at',
        updatedAt:'updated_at',
        deletedAt:'deleted_at',
    });
    
   
   
    
    
    return UserToken;
    };