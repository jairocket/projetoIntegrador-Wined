module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      brotherhood_id: {
        type: DataTypes.INTEGER(11),
        allowNull: false
      },
      users_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false
      },
      content:{
        type: DataTypes.STRING(5120)
      },
      comment: DataTypes.BOOLEAN
    },
    {
      tableName: "posts"
    });
  
    Post.associate = function(models) {

      Post.belongsTo(models.User, {
        as: 'author',
        foreignKey: "users_id"
      });

      Post.belongsTo(models.Brotherhood,{
        as: "brotherhood",
        foreignKey: "brotherhood_id"
      });

      Post.hasMany(models.Reaction,{
        foreignKey: "post_id",
        as: "reactions"
      });

      Post.hasMany(models.Post_Comment, {    
        foreignKey: "ref_post_id",
        as: "comments",
      });

      Post.hasMany(models.Post_Comment, {
        foreignKey: "post_id",
        as: "contents"
      })


      

      Post.hasMany(models.Post_Midia);
    }

  
    return Post;
  };