module.exports = (sequelize, DataTypes) => {
    const Post_Comment = sequelize.define('Post_Comment', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      post_id:{
          type: DataTypes.INTEGER,

      },
  
      response: DataTypes.BOOLEAN
    },

    {
      tableName: "post_comments"
    });
  
    Post_Comment.associate = function(models) {

      Post_Comment.belongsTo(models.Post, {
        as: 'comments',
        foreignKey: "post_id"
      });
    }
  
    return Post_Comment;
  };