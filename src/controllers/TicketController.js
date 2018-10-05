// const Promise = require('bluebird');

const {Ticket} = require('../models');
const {Sequelize, Plan, Client, PassangersTicket, Passanger, Company, Destination, Payment} = require('../models');

// const Op = Sequelize.Op;

module.exports = {
    async addTicket (req, res) {
        var objTicket = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});
        try {
            var ticket = await Ticket.create(objTicket);
        } catch (err) {
            res.status(400).send(err);
        }
        res.send({id: ticket.id});
    },

    async list (req, res) {
        try {
            const tickets = await Ticket.findAll({
                where: {type: req.params.type},
                order: [
                    [Sequelize.col('createdAt'), 'DESC']
                ],
                include: [
                    {
                        model:Destination,
                        as: 'Destination'
                    },
                    {
                        model: Company,
                        as: 'Company'
                    },
                    {
                        model: Destination,
                        as: 'Arrival'
                    },
                    {
                        model: PassangersTicket,
                        include: [
                            Passanger,
                            {
                                model: Client,
                                as: 'ClientPassanger'
                            }
                        ]
                    },
                    {
                        model: Plan,
                        include: [
                            Payment
                        ]
                    },
                    Client
                ]
            });
            res.status(200).send(tickets);
        } catch (err) {
            console.log(err);
            res.status(400).send({message: err.toString()});
        }
    },

    async checkTicket (req, res) {
        await Ticket.update(
            {
                potvrdjeno: true
            },
            {
                where: {id: req.body.id}
            })
            .then(() => {
                res.status(200).send({
                    message: 'Karta cekirana'
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send({
                    message: err.toString()
                });
            });
    },

    async uncheckTicket (req, res) {
        await Ticket.update(
            {
                potvrdjeno: false
            },
            {
                where: {id: req.body.id}
            })
            .then(() => {
                res.status(200).send({
                    message: 'Karta nije vise cekirana'
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send({
                    message: err.toString()
                });
            });
    },

    async edit (req, res) {
        var objTicket = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});
        try {
            await Ticket.update(objTicket, {
                where: {
                    id: req.params.id
                }
            });
            res.status(202).send({id: req.params.id});
        } catch (err) {
            res.send({message: err.toString()});
            console.log(err);
        }
    },

    async delete (req, res) {
        try {
            await Ticket.destroy({
                where: {
                    id: req.body.id
                }
            });
            res.status(200).send({
                msg: 'Client izbrisan'
            });
        } catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    },

    async getTicket (req, res) {
        try {
            var id = req.params.id;
            var ticket = await Ticket.findOne({
                where: { id: id },
                include: [
                    Client,
                    {
                        model: Plan,
                        include: [ Client ]
                    }
                ]
            });
            res.status(200).send(ticket);
        } catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    }
};
