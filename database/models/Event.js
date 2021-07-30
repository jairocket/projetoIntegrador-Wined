module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      street:{
          type: DataTypes.STRING(255),
          allowNull:false
      },
      cep:{
        type: DataTypes.STRING(255),
        allowNull:false
      },
      complement:{
        type: DataTypes.STRING(255),
        allowNull:false
      },
      number:{
        type: DataTypes.STRING(255),
        allowNull:false
      },
      city:{
        type: DataTypes.STRING(255),
        allowNull:false
      },
      state:{
        type: DataTypes.STRING(255),
        allowNull:false
      },

      brotherhood_id:{
          type: DataTypes.INTEGER,
          allowNull: false
      }
    },
    {
      tableName: "events",
      timestamps: false
    });
  
    Event.associate = function(models) {
        Event.belongsTo(models.Brotherhood,{
          as: "events",
          foreignKey: "brotherhood_id"
        });
        Event.belongsToMany(models.User,{
          through: models.User_Event,
          foreignKey: "events_id"
        });
    }
  
    return Event;
  };