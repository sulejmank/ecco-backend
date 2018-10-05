module.exports = (sequelize, DataTypes) =>
    sequelize.define('Picklist',
        {
            title: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.STRING
            },
            delimeter: {
                type: DataTypes.STRING
            },
            value: {
                type: DataTypes.STRING
            }
        });
