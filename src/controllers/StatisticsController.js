const {
    Plan,
    Client,
    Ticket,
    Arrangement,
    Passanger,
    PassangersTicket,
    Destination,
    PassangersArrangement,
    Picklist,
    Company,
    Hotel,
    Agent,
    Payment
} = require('../models');
// const {$col} = require('sequelize').Op;

module.exports = {
    async customers (req, res) {
        try {
            let customers = await Client.findAll({
                include: [
                    {
                        model: Ticket,
                        include: [
                            Client,
                            {
                                model: Destination,
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
                            }
                        ]
                    },
                    {
                        model: Arrangement,
                        include: [
                            Client,
                            Hotel,
                            Agent,
                            {
                                model: Picklist,
                                as: 'Type'
                            },
                            {
                                model: Picklist,
                                as: 'Service'
                            },
                            {
                                model: Destination,
                                as: 'Destination'
                            },
                            {
                                model: Destination,
                                as: 'Depart'
                            },
                            {
                                model: PassangersArrangement,
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
                            }
                        ]
                    }
                ]
            });
            res.status(200).send(customers);
        } catch (err) {
            res.status(500).send({message: err.toString()});
        }
    },

    async destinations (req, res) {
        try {
            let destinations = await Destination.findAll({
                include: [
                    {
                        model: Arrangement,
                        // where: {
                        //     DestinationId: {$col: 'Destination.id'}
                        // },
                        include: [
                            Client,
                            Hotel,
                            Agent,
                            {
                                model: Picklist,
                                as: 'Type'
                            },
                            {
                                model: Picklist,
                                as: 'Service'
                            },
                            {
                                model: PassangersArrangement,
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
                            }
                        ],
                        order: '"createdAt" DESC'
                    },
                    {
                        model: Ticket,
                        as: 'Destination',
                        include: [
                            Client,
                            {
                                model: Company,
                                as: 'Company'
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
                            }
                        ],
                        order: '"createdAt" DESC'
                    }
                ]
            });
            res.status(200).send(destinations);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }
};
