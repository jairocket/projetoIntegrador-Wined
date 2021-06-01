const Brotherhood = require("./Brotherhood");

module.exports = (sequelize, DataTypes) => {
    const Brotherhood_Picture = sequelize.define('Brotherhood_Picture', {
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
      tableName: "brotherhood_pictures"
    });
  
    Brotherhood_Picture.associate = function(models) {
      Brotherhood_Picture.belongsTo(Brotherhood)
    }
  
    return Brotherhood_Picture;
  };