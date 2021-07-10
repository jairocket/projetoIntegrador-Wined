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

      ref_post_id:{
        type: DataTypes.INTEGER,

    },
  
      response: DataTypes.BOOLEAN
    },

    {
      tableName: "post_comments",
      timestamps: false
    });
  
    Post_Comment.associate = function(models) {

      Post_Comment.belongsTo(models.Post, {
        as: 'comments',
        foreignKey: "post_id"
      });

      Post_Comment.belongsTo(models.Post, {
        as: 'reference post',
        foreignKey: "ref_post_id"
      });
    }
  
    return Post_Comment;
  };