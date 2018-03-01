module.exports = (sequelize, DataTypes) =>
    sequelize.define('Customer', {
        ime: {
            type: DataTypes.STRING  
        },
        prezime:{
            type: DataTypes.STRING
        },
        datumRodjenja: {
            type:DataTypes.DATEONLY
        },
        brojTelefona: {
            type:DataTypes.STRING,
            unique:true
        },
        adresa: {
            type:DataTypes.STRING
        }
    });