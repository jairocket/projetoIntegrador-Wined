
module.exports = (sequelize, DataTypes)=>{
    const Brotherhood = sequelize.define("Brotherhood", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
   
        background_Pic: {
            type: DataTypes.STRING(255),
            defaultValue: " "
        },

        description: {
            type: DataTypes.STRING(255),
        }
    },{
        tableName: "brotherhood"
    })

    Brotherhood.associate = function(modelos){
        Brotherhood.belongsToMany(modelos.User, {
            through: modelos.Brotherhood_User,
            foreignKey: "user_id"
        })  
    }

    return Brotherhood
}

