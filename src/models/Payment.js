module.exports = (sequelize, DataTypes) =>
    sequelize.define('Payment',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            payment: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false
            },
            paymentDate: {
                type: DataTypes.DATE,
                allowNull: true
            }
        });
