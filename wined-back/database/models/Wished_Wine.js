module.exports = (sequelize, DataTypes)=>{
    const Wished_Wine = sequelize.define("Wished_Wine", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        users_id: {
            type: DataTypes.INTEGER(10)
        },   
        wine_id: {
            type: DataTypes.INTEGER(11)
        },
    },{
        tableName: "wished_wines",
        timestamps: false
    });
    //     Wished_Wine.associate = function(models){
    //         Wished_Wine.belongsTo(models.User, {
    //             as: 'wished',
    //             foreign_key: 'users_id'
    //         });
    //         Wished_Wine.belongsTo(models.Wine, {
    //             as: 'oenophile',
    //             foreign_key: 'wine_id'
    //     });
    // }

    return Wished_Wine

}