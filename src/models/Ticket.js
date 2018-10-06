module.exports = (sequelize, DataTypes) =>
    sequelize.define('Ticket',
        {
            putovanjeOd: {
                type: DataTypes.STRING
            },
            putovanjeDo: {
                type: DataTypes.STRING
            },
            jedanParvac: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            datumPolaska: {
                type: DataTypes.DATE
            },
            datumDolaska: {
                type: DataTypes.DATE,
                allowNull: true
            },
            avioKompanija: {
                type: DataTypes.STRING
            },
            potvrdjeno: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            datumRezervacije: {
                type: DataTypes.DATE
            },
            type: {
                type: DataTypes.ENUM('flight', 'bus')
            }
        });
