module.exports = (sequelize, DataTypes) =>
    sequelize.define('Plan',
        {
            avans: {
                type: DataTypes.DECIMAL(10, 2)
            },
            totalnaCena: {
                type: DataTypes.DECIMAL(10, 2)
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            rokUplate: {
                type: DataTypes.DATE
            }
        });
