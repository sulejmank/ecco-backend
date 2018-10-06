module.exports = (sequelize, DataTypes) =>
    sequelize.define('User',
        {
            name: {
                type: DataTypes.STRING,
                allowNull: true
            },
            surname: {
                type: DataTypes.STRING,
                allowNull: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                type: DataTypes.STRING
            },
            imageUrl: {
                type: DataTypes.STRING,
                defaultValue: 'https://i.imgur.com/BjP9MgO.png'
            },
            role: {
                type: DataTypes.ENUM('admin', 'seller')
            }
        });
