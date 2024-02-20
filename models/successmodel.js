// const constant = require("../config/utils/constant");

module.exports = (sequelize, DataTypes) => {
    const Success = sequelize.define('Success', {
      order_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: "user",
        key: "user_id",
        },
    },
     
      order_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
    //  
      shipping_address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'addresses',
        //   key: 'address_id'
        // }
      },
      billing_address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //   model: 'addresses',
        //   key: 'address_id'
        // }
      },
     
    },
    {
        paranoid: true,
        tableName: 'success', 
        createdAt: 'created_at', 
        updatedAt:'updated_at', 
        deletedAt: 'deleted_at', 
        });







 

   
  

  return Success;
}