module.exports = (sequelize, DataTypes) => 
    sequelize.define('Plan',
    {
        avans: {
            type:DataTypes.DECIMAL(10,2)
        },
        totalnaCena: {
            type:DataTypes.DECIMAL(10,2)
        },
        status: {
            type:DataTypes.BOOLEAN, // ne podrzava mi enum za mysql, al moze i ovako jer ima dva stanja 0-pending, 1-paid
            defaultValue: false
        }
});