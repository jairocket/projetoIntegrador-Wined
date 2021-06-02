module.exports = (sequelize, DataTypes) => {
  const Profile_Picture = sequelize.define('Profile_Picture', {
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
    tableName: "profile_pictures"
  });

  Profile_Picture.associate = function(models) {
    Profile_Picture.belongsTo(models.User)
  }

  return Profile_Picture;
};