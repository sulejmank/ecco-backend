module.exports = (sequelize, DataTypes) =>
    sequelize.define('Passanger',
        {
            ime: {
                type: DataTypes.STRING
            },
            prezime: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true
            },
            datumRodjenja: {
                type: DataTypes.DATEONLY,
                allowNull: true
            },
            brojTelefona: {
                type: DataTypes.STRING,
                allowNull: true
            },
            urlSlike: {
                type: DataTypes.STRING,
                defaultValue: 'https://i.imgur.com/BjP9MgO.png'
            },
            adresa: {
                type: DataTypes.STRING,
                allowNull: true
            },
            brojPasosa: {
                type: DataTypes.STRING,
                unique: true
            },
            struka: {
                type: DataTypes.STRING,
                allowNull: true
            }
        });
