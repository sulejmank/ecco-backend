module.exports = (sequelize, DataTypes) =>
    sequelize.define('Rata',
        {
            datum: {
                type: DataTypes.DATE
            },
            iznos: {
                type: DataTypes.DECIMAL(10, 2)
            },
            status: {
                type: DataTypes.BOOLEAN, // ista logika ko za plan
                defaultValue: false
            }
        });
