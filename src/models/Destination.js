module.exports = (sequelize, DataTypes) =>
    sequelize.define('Destination',
        {
            destinacija: {
                type: DataTypes.STRING
            },
            google_id: {
                type: DataTypes.STRING
            }
        });
