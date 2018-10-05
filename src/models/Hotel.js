module.exports = (sequelize, DataTypes) =>
    sequelize.define('Hotel',
        {
            name: {
                type: DataTypes.STRING
            }
        });
