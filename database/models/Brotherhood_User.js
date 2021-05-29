



module.exports = (sequelize, DataTypes)=>{
    const Brotherhood_User = sequelize.define("Brotherhood", {
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
        tableName: "brotherhood_user",
        timestamps: false
    })
    return Brotherhood_User
}





