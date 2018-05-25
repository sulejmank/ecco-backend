module.exports = (sequelize, DataTypes) =>
    sequelize.define('Plan',
        {
            avans: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            totalnaCena: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: true
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: true
            },
            rokUplate: {
                type: DataTypes.DATE,
                allowNull: true
            }
        });
