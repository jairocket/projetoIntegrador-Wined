module.exports = (sequelize, DataTypes )=>{
    const Wine = sequelize.define( "Wine", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        wine: {
            type: DataTypes.STRING(255),
        },
        wine_slug: {
            type: DataTypes.STRING(255),
        },
        appellation: {
            type: DataTypes.STRING(255),
        },
        appellation_slug: {
            type: DataTypes.STRING(255)
        },
        color: {
            type: DataTypes.STRING(255)
        },
        wine_type: {
            type: DataTypes.STRING(255)
        },
        regions: {
            type: DataTypes.STRING(255)
        },
        country: {
            type: DataTypes.STRING(255)
        },
        vintage: {
            type: DataTypes.STRING(255)
        },
        score: {
            type: DataTypes.INTEGER
        },
        confidence_index: {
            type: DataTypes.STRING(255)
        },
        picture_path: DataTypes.STRING(255)

    },{
        tableName: 'wines',
        timestamps: false
    });

    Wine.associate = function(models){
        Wine.belongsToMany(models.User, {
            through: models.Favorite_Wine,
            as: "favorite_wines",
            foreignKey: "wine_id"
        });
        Wine.hasMany(models.Favorite_Wine,{
            as: "oenophiles",
            foreignKey: "wine_id"
        });
        Wine.belongsToMany(models.User, {
            through: models.Wished_Wine,
            as: "wished_wines",
            foreignKey: "wine_id"
        });
        Wine.hasMany(models.Wished_Wine,{
            as: "oenophiless",
            foreignKey: "wine_id"
        });
    }

    return Wine
}