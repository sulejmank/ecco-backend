module.exports = (sequelize, DataTypes) =>
   sequelize.define('Customer', 
    {
        ime: {
            type:DataTypes.STRING  
        },
        prezime:{
            type:DataTypes.STRING
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
        },
        putnik: {
            type:DataTypes.BOOLEAN,
            defaultValue: false
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

  

