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

db.Klijent.hasMany(db.AvioKarta);
db.AvioKarta.belongsTo(db.Klijent);

db.Klijent.hasOne(db.Plan);
db.Plan.belongsTo(db.Klijent);

db.Klijent.hasMany(db.Angazman);
db.Angazman.belongsTo(db.Klijent);

db.Angazman.belongsTo(db.Plan);

db.Plan.hasMany(db.AvioKarta);
db.AvioKarta.belongsTo(db.Plan);

db.Plan.hasOne(db.Rata);
db.Rata.belongsTo(db.Plan);

db.Plan.hasMany(db.Transfer);
db.Transfer.belongsTo(db.Plan);

module.exports = db;
