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
        avatar_picture: {
            type: DataTypes.STRING(255),
        },  
        background_picture: {
            type: DataTypes.STRING(255)
        },
        description: {
            type: DataTypes.STRING(1024),
        },
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        },
        provider: {
            type: DataTypes.BOOLEAN,
            default: false
        }
    },{
        tableName: "users"
    });

    User.associate = function(modelos){
        User.belongsToMany(modelos.Brotherhood, {
            through: modelos.Brotherhood_User,
            foreignKey: "users_id",
            as: 'brotherhoods'
        });
        User.hasMany(modelos.Brotherhood_User,{
            foreignKey: "users_id",
            as: "chancellor"
        })
        // User.hasOne(modelos.Profile_Picture, {
        //     as: "profile_pictures",
        //     foreignKey: "profile_picture_id"
        // });
        // User.hasOne(modelos.Background_Picture, {
        //     as: "background_pictures",
        //     foreignKey: "background_picture_id"
        // });
        User.belongsToMany(modelos.Event, {
            through: modelos.User_Event,
            foreignKey: "users_id"
        });
        User.hasMany(modelos.Post, {
            as: "posts"
        });
        User.hasMany(modelos.Reaction, {
            as: "reactions"
        });

    };

    return User
};