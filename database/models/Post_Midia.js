module.exports = (sequelize, DataTypes) => {
    const Post_Midia = sequelize.define('Post_Midia', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      post_id:{
          type: DataTypes.INTEGER,

      },
  
      midia_type: DataTypes.STRING,

      midia_path: DataTypes.STRING
    },

    

    {
      tableName: "posts_midia"
    });
  
    Post_Midia.associate = function(models) {

      Post_Midia.belongsTo(models.Post, {
        as: 'midia',
        foreignKey: "post_id"
      });
    }
  
    return Post_Midia;
  };