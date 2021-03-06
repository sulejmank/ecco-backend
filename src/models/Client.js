module.exports = (sequelize, DataTypes) =>
    sequelize.define('Client',
        {
            ime: {
                type: DataTypes.STRING
            },
            prezime: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING
            },
            datumRodjenja: {
                type: DataTypes.DATEONLY
            },
            brojTelefona: {
                type: DataTypes.STRING
            },
            urlSlike: {
                type: DataTypes.STRING,
                defaultValue: 'https://i.imgur.com/BjP9MgO.png'
            },
            adresa: {
                type: DataTypes.STRING,
                allowNull: true
            },
            kupac: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            brojPasosa: {
                type: DataTypes.STRING,
                unique: true
            },
            struka: {
                type: DataTypes.STRING
            }
        });
