module.exports = (sequelize, DataTypes) =>
    sequelize.define('Company',
        {
            name: {
                type: DataTypes.STRING
            }
        }, {tableName: 'Companies'});
