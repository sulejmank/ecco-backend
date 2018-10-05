module.exports = (sequelize, DataTypes) =>
    sequelize.define('PassangersTicket',
        {
            brojRezervacije: {
                type: DataTypes.STRING,
                allowNull: true
            }
        });
