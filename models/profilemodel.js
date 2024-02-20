module.exports =(sequelize, DataTypes) => {

    const Profile = sequelize.define("Profile", {
        profile_id: {
         type: DataTypes.INTEGER,
         primaryKey: true,
         autoIncrement: true,
        },
        
        firstname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profile_pic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        paranoid : true,       
        tableName :'profile_tbl',
        createdAt :'created_at',
        updatedAt :'updated_at',
        deletedAt :'deleted_at',
    });






    return Profile;
}