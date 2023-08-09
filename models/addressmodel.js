module.exports =(sequelize, DataTypes) => {

    const Address = sequelize.define("Address", {
        address_id: {
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
        address_type: {
         type: DataTypes.STRING,
         allowNull: false,
        },
        street: {
         type: DataTypes.STRING,
         allowNull: false,
        },
        city: {
         type: DataTypes.STRING,
         allowNull: false,
        },
        state: {
         type: DataTypes.STRING,
         allowNull: false,
        },
        country: {
         type: DataTypes.STRING,
         allowNull: false,
        },
        postal_code: {
         type: DataTypes.STRING,
         allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
         type: DataTypes.STRING,
         allowNull: true
    },
    },
    {
        paranoid: true,
        tableName: 'addresses',
         createdAt:'created_at',
         updatedAt:'updated_at',
         deletedAt: 'deleted_at',
        });
    
        
    
    return Address;
    };


    