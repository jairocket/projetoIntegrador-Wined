module.exports = (sequelize, DataTypes) => {
  const Brotherhood = sequelize.define(
    "Brotherhood",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      brotherhood_picture: {
        type: DataTypes.STRING(255),
      },
      description: {
        type: DataTypes.STRING(255),
      },
      since: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: "brotherhoods",
    }
  );

  Brotherhood.associate = function (modelos) {
    Brotherhood.belongsToMany(modelos.User, {
      through: modelos.Brotherhood_User,
      foreignKey: "brotherhood_id",
      as: "users",
    });

    Brotherhood.hasMany(modelos.Brotherhood_User, {
      foreignKey: "brotherhood_id",
      as: "chancellor",
    });

    Brotherhood.hasMany(modelos.Post, {
      foreignKey: "brotherhood_id",
      as: "posts",
    });

    Brotherhood.hasMany(modelos.Event, {
      as: "events",
      foreignKey: "brotherhood_id",
    });
  };

  return Brotherhood;
};

// Brotherhood.hasOne(modelos.Brotherhood_Picture, {
//     as: "brotherhood_pictures",
//     foreignKey: "brotherhood_picture_id"
// });
