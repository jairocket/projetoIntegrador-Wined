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
            allowNull: false
        },
        terms: {
            type: DataTypes.STRING,
            allowNull:false
        },
        password: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        profilePicture: DataTypes.STRING(25),  

        backgroundPicture: DataTypes.STRING(25),

        userDescription: DataTypes.STRING,
        
        birthday: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        tableName: "user"
    })
    return User
}