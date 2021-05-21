module.exports = (sequelize, DataTypes)=>{
    const User = sequelize.define("User", {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        surname: {
            type: DataTypes.STRING(25),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        terms: {
            type: DataTypes.STRING,
            allowNull:false
        },
        password: {
            type: DataTypes.STRING(2048),
            allowNull: false
        },
        profilePicture: {
            type: DataTypes.STRING(25),
            defaultValue: " "
        },  

        backgroundPicture: {
            type: DataTypes.STRING(25),
            defaultValue: " "
        },

        description: {
            type: DataTypes.STRING(1024),
        },

        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        tableName: "users"
    })
    return User
}