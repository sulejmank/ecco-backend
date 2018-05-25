module.exports = (sequelize, DataTypes) =>
    sequelize.define('Installment',
        {
            datum: {
                type: DataTypes.DATE,
                defaultValue: function() {
                    let datum = Date();
                    datum.setMonths(datum.getMonths() + 6);
                    return datum;
                }
            },
            iznos: {
                type: DataTypes.DECIMAL(10, 2)
            },
            status: {
                type: DataTypes.BOOLEAN, 
                defaultValue: false
            }
        });
