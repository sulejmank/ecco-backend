module.exports = (sequelize, DataTypes) =>
    sequelize.define('Arrangement',
        {
            destinacija: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hotel: {
                type: DataTypes.STRING
            },
            strukturaSobe: {
                type: DataTypes.STRING
            },
            usluge: {
                type: DataTypes.STRING
            },
            datumPocetka: {
                type: DataTypes.DATE
            },
            datumZavrsetka: {
                type: DataTypes.DATE
            },
            usluznaKompanija: {
                type: DataTypes.STRING
            },
            cena: {
                type: DataTypes.DECIMAL(10, 2)
            },
            brojPutnika: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            }
        });
