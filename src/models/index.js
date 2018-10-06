const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.js');

const db = {};

const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options, {
        define: {
            charset: 'utf8mb4',
            collation: 'cp1250_bin',
            timestamps: true
        }
    }
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

db.Client.hasMany(db.Ticket);
db.Ticket.belongsTo(db.Client);

db.Client.hasMany(db.Transfer);
db.Transfer.belongsTo(db.Client);

db.Client.hasOne(db.Plan);
db.Plan.belongsTo(db.Client);

db.Client.hasMany(db.Arrangement);
db.Arrangement.belongsTo(db.Client);

db.Plan.hasMany(db.Arrangement);
db.Arrangement.belongsTo(db.Plan);

db.Plan.hasMany(db.Ticket);
db.Ticket.belongsTo(db.Plan);

db.Plan.hasMany(db.Installment);
db.Installment.belongsTo(db.Plan);

db.Plan.hasMany(db.Transfer);
db.Transfer.belongsTo(db.Plan);

db.Arrangement.hasMany(db.Room);
db.Room.belongsTo(db.Arrangement);

db.Room.hasMany(db.PassangersInRoom);

db.PassangersInRoom.belongsTo(db.Passanger);
db.PassangersInRoom.belongsTo(db.Room);

db.Payment.belongsTo(db.Plan);
db.Plan.hasMany(db.Payment);

db.Ticket.belongsTo(db.Destination, {as: 'Destination'});
db.Destination.hasMany(db.Ticket, {as: 'Destination'});
// db.Destination.hasMany(db.Ticket);
db.Ticket.belongsTo(db.Destination, {as: 'Arrival'});
// db.Destination.hasMany(db.Ticket, {as: 'Tickets'});
db.Destination.hasMany(db.Ticket, {as: 'Arrival'});
db.Ticket.belongsTo(db.Company, {as: 'Company'});

db.Passanger.hasMany(db.PassangersTicket);
db.Ticket.hasMany(db.PassangersTicket);
db.PassangersTicket.belongsTo(db.Passanger);
db.PassangersTicket.belongsTo(db.Client, {as: 'ClientPassanger'});
db.PassangersTicket.belongsTo(db.Ticket);

db.Passanger.hasMany(db.PassangersArrangement);
db.Client.hasMany(db.PassangersArrangement);
db.Arrangement.hasMany(db.PassangersArrangement);
db.PassangersArrangement.belongsTo(db.Passanger);
db.PassangersArrangement.belongsTo(db.Client, {as: 'ClientPassanger'});
db.PassangersArrangement.belongsTo(db.Arrangement);

// Arrangement Foreign Key Relations
db.Arrangement.belongsTo(db.Destination, {as: 'Destination'});
db.Destination.hasMany(db.Arrangement);
db.Arrangement.belongsTo(db.Destination, {as: 'Depart'});
db.Arrangement.belongsTo(db.Hotel);
db.Arrangement.belongsTo(db.Agent);
db.Arrangement.belongsTo(db.Memorandum);
db.Memorandum.hasOne(db.Memorandum);
// db.Arrangement.belongsTo(db.Destination, {as: 'Arrival'});
db.Arrangement.belongsTo(db.Picklist, {as: 'Service'});
db.Arrangement.belongsTo(db.Picklist, {as: 'Type'});

// Room Foreign Key Relations
db.Room.belongsTo(db.Picklist, {as: 'RoomType'});
db.Room.belongsTo(db.Picklist, {as: 'RoomContent'});

module.exports = db;
