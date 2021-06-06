module.exports = (sequelize, DataTypes)=>{
    const Reaction = sequelize.define("Reaction", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        users_id: {
            type: DataTypes.INTEGER(10)
        },   
        post_id: {
            type: DataTypes.INTEGER(11)
        },
        
    },{
        tableName: "reactions",     
    });
    Reaction.associate = function(models){
        Reaction.belongsTo(models.User, {
            foreignKey: "users_id"
        });
        Reaction.belongsTo(models.Post, {
            foreignKey: "post_id"
        })
    }

    return Reaction
};