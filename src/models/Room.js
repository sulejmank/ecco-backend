module.exports = (sequelize, DataTypes) =>
    sequelize.define('Room',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            }
        });
