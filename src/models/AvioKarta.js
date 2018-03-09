module.exports = (sequelize, DataTypes) => 
    sequelize.define('AvioKarta', 
{
    putovanjeOd: {
        type:DataTypes.STRING
    },
    putovanjeDo: {
        type:DataTypes.STRING
    },
    jedanParvac: {
        type:DataTypes.BOOLEAN,
        defaultValue: true
    },
    datumPolaska: {
        type:DataTypes.DATE
    },
    datumDolaska: {
        type:DataTypes.DATE,
        allowNull: true
    },
    brojRezervacije: {
        type:DataTypes.STRING,
        allowNull: true
    },
    avioKompanija: {
        type:DataTypes.STRING
    },
    potvrdjeno: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    cena: {
        type: DataTypes.DECIMAL(10, 2)
    },
    datumRezervacije: {
        type: DataTypes.DATE
    }

});


