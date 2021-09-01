module.exports = (sequelize, DataTypes)=>{
    const User_Event = sequelize.define("User_Event", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        users_id: {
            type: DataTypes.INTEGER(10)
        },   
        events_id: {
            type: DataTypes.INTEGER(11)
        },
    },{
        tableName: "users_events",
        timestamps: false
    });


    return User_Event

}