module.exports = (sequelize, DataTypes) =>
    sequelize.define('Angazman',
        {
            destinacija: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hotel: {
                type: DataTypes.STRING
            },
            struktura_sobe: {
                type: DataTypes.ENUM,
                values: [
                    '1-krevetna',
                    '2-krevetna'
                ]
            },
            usluga: {
                type: DataTypes.ENUM,
                values: [
                    'polu-pansion',
                    'pun-pansion', 'bez'
                ]
            },
            datumPocetka: {
                type: DataTypes.DATE
            },
            datumZavrsetka: {
                type: DataTypes.DATE
            },
            cena: {
                type: DataTypes.DECIMAL(10, 2)
            },
            brojPutnika: {
                type: DataTypes.INTEGER
            }
        });
