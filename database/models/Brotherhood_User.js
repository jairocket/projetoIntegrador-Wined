module.exports = (sequelize, DataTypes)=>{
    const Brotherhood_User = sequelize.define("Brotherhood_User", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        users_id: {
            type: DataTypes.INTEGER(10)
        },   
        brotherhood_id: {
            type: DataTypes.INTEGER(11)
        },
        chancellor: {
            type: DataTypes.BOOLEAN,
        }
    },{
        tableName: "brotherhoods_users",
        timestamps: false
    });
    Brotherhood_User.associate = function(modelos){
        Brotherhood_User.hasMany(modelos.User, {
            as: "user_brotherhood",
            foreignKey: "id"
        });

        Brotherhood_User.hasMany(modelos.Brotherhood, {
            as: "brotherhood_user",
            foreignKey: "id"
        });
    }
    return Brotherhood_User
};