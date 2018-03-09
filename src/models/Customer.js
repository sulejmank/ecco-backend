module.exports = (sequelize, DataTypes) =>
   sequelize.define('Customer', 
    {
        ime: {
            type:DataTypes.STRING ,
        },
        prezime:{
            type:DataTypes.STRING,
        },
        email: {
          type:DataTypes.STRING,
        },
        datumRodjenja: {
            type:DataTypes.DATEONLY,
        },
        brojTelefona: {
            type:DataTypes.STRING,
        },
        urlSlike: {
            type:DataTypes.STRING,
            defaultValue:''// avatar
        },
        adresa: {
            type:DataTypes.STRING,
            allowNull: true
        },
        putnik: {
            type:DataTypes.BOOLEAN,
            defaultValue: false
        },
        brojPasosa: {
            type:DataTypes.STRING,
            unique:true
        },
        struka: {
            type:DataTypes.STRING
        }
    });

  

