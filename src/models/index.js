const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.js');

const db = {};

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
);

fs
    .readdirSync(__dirname)
    .filter((file) =>
        file !== 'index.js'
    )
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Client.hasMany(db.FlightTicket);
db.FlightTicket.belongsTo(db.Client);

db.Client.hasMany(db.Transfer);
db.Transfer.belongsTo(db.Client);

db.Client.hasOne(db.Plan);
db.Plan.belongsTo(db.Client);

db.Client.hasMany(db.Arrangement);
db.Arrangement.belongsTo(db.Client);

db.Arrangement.belongsTo(db.Plan);

db.Plan.hasMany(db.FlightTicket);
db.FlightTicket.belongsTo(db.Plan);

db.Plan.hasMany(db.Installment);
db.Installment.belongsTo(db.Plan);

db.Plan.hasMany(db.Transfer);
db.Transfer.belongsTo(db.Plan);

db.ArrangementPutnici.belongsTo(db.Client);
db.ArrangementPutnici.belongsTo(db.Arrangement);

module.exports = db;
