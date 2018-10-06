module.exports = (sequelize, DataTypes) =>
    sequelize.define('Memorandum',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            driveId: {
                type: DataTypes.STRING
            },
            name: {
                type: DataTypes.STRING
            }
        });
