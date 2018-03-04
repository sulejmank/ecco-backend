module.exports = (sequelize, DataTypes) =>
   sequelize.define('Customer', 
    {
        ime: {
            type:DataTypes.STRING ,
            allowNull: true 
        },
        prezime:{
            type:DataTypes.STRING,
            allowNull: true
        },
        email: {
          type:DataTypes.STRING,
          allowNull: true
        },
        datumRodjenja: {
            type:DataTypes.DATEONLY,
            allowNull: true
        },
        brojTelefona: {
            type:DataTypes.STRING,
            allowNull: true
        },
        adresa: {
            type:DataTypes.STRING,
            allowNull: true
        },
        putnik: {
            type:DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true
        },
        brojPasosa: {
            type:DataTypes.STRING,
            unique:true,
            allowNull: true
        },
        struka: {
            type:DataTypes.STRING,
            allowNull: true
        }
    });

  

