    module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define("User", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        terms: {
            type: DataTypes.STRING(10),
            allowNull:false
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        profile_picture_id: {
            type: DataTypes.INTEGER
        },  
        background_picture_id: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING(1024),
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        tableName: "users"
    });

    User.associate = function(modelos){
        User.belongsToMany(modelos.Brotherhood, {
            through: modelos.Brotherhood_User,
            foreignKey: "users_id"
        });
        User.hasOne(modelos.Profile_Picture, {
            as: "profile_pictures",
            foreignKey: "profile_picture_id"
        });
        User.hasOne(modelos.Background_Picture, {
            as: "background_pictures",
            foreignKey: "background_picture_id"
        });
    };

    return User
};