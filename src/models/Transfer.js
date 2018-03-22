module.exports = (sequelize, DataTypes) =>
    sequelize.define('Transfer',
        {
            destinacija: {
                type: DataTypes.STRING,
                allowNull: false
            },
            polazak: {
                type: DataTypes.STRING,
                allowNull: false
            },
            prevoz: {
                type: DataTypes.ENUM,
                values: [
                    'vozilo',
                    'taxi',
                    'autobus'
                ]
            },
            cena: {
                type: DataTypes.DECIMAL(10, 2)
            }
        });
