module.exports = (sequelize, DataTypes) =>
    sequelize.define('Agent',
        {
            name: {
                type: DataTypes.STRING
            }
        });
