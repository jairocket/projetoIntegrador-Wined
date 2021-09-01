module.exports = (sequelize, DataTypes)=>{
    const Favorite_Wine = sequelize.define("Favorite_Wine", {
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
        tableName: "favorite_wines",
        timestamps: false
    });
    // Favorite_Wine.associate = function(models){
    //     Favorite_Wine.belongsTo(models.User, {
    //         as: 'favorites',
    //         foreign_key: 'users_id'
    //     });
    //     Favorite_Wine.belongsTo(models.Wine, {
    //         as: 'oenophile',
    //         foreign_key: 'wine_id'
    //     });
    // }
    return Favorite_Wine

}