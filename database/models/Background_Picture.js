module.exports = (sequelize, DataTypes) => {
    const Background_Picture = sequelize.define('Background_Picture', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      path: {
        type: DataTypes.STRING(1024),
        allowNull: false
      }
    },
    {
      tableName: "background_pictures"
    });
  
    Background_Picture.associate = function(models) {
      Background_Picture.belongsTo(models.User)
    }
  
    return Background_Picture;
  };