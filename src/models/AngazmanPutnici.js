module.exports = (sequelize, DataTypes) =>
    sequelize.define('AngazmanPutnici',
        {
            idAngazmana: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            idPutnika: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        });
