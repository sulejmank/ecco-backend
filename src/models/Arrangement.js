module.exports = (sequelize, DataTypes) =>
    sequelize.define('Arrangement',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            destinacija: {
                type: DataTypes.STRING,
                allowNull: false
            },
            hotel: {
                type: DataTypes.STRING
            },
            usluga: {
                type: DataTypes.STRING
            },
            tipAngazmana: {
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
            brojPutnika: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            brojDana: {
                type: DataTypes.STRING
            },
            mestoPolaska: {
                type: DataTypes.STRING,
                allowNull: true
            },
            mestoPristanista: {
                type: DataTypes.STRING,
                allowNull: true
            },
            agent: {
                type: DataTypes.STRING,
                allowNull: true
            }
        });
