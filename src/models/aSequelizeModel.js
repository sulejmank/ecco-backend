module.exports = (sequelize, DataTypes) =>
    sequelize.define('aSequelizeModel',
        {
            sid: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            sess: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            expire: {
                type: DataTypes.DATE,
                allowNull: false
            }
        });
