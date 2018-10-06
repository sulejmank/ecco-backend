const {
    Plan,
    Client,
    Ticket,
    Arrangement,
    Room,
    PassangersInRoom,
    Passanger,
    PassangersTicket,
    Destination,
    PassangersArrangement,
    Picklist,
    Company,
    Hotel,
    Agent,
    Memorandum,
    Sequelize
} = require('../models');

module.exports = {
    async savePlan (req, res) {
        var objPlan = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});
        try {
            const plan = await Plan.create({
                neto: objPlan.neto,
                bruto: objPlan.bruto,
                avans: objPlan.avans,
                notes: objPlan.notes,
                status: objPlan.avans === null,
                ClientId: objPlan.customerId,
                rokUplate: objPlan.rokUplate
            });
            res.status(200).send({id: plan.id});
        } catch (err) {
            res.status(400).send({
                message: 'Neuspesno kreiranje prodaje'
            });
        }
    },

    async addPlan (req, res) {
        try {
            const plan = await Plan.create(req.body);
            res.status(200).send(plan.id.toString());
        } catch (err) {
            res.status(400).send({
                error: err.toString()
            });
        }
    },

    async updatePlan (req, res) {
        var objPlan = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});
        try {
            var plan = await Plan.findById(req.params.id);
            if (plan !== null) {
                await plan.update({
                    neto: objPlan.neto,
                    bruto: objPlan.bruto,
                    avans: objPlan.avans,
                    notes: objPlan.notes,
                    status: objPlan.avans === null,
                    ClientId: objPlan.customerId,
                    rokUplate: objPlan.rokUplate
                });
                res.status(200).send(plan);
            } else {
                res.status(400).send({message: 'Prodaja nespesno azurirana'});
            }
        } catch (err) {
            res.status(400).send({
                message: err.toString()
            });
        }
    },
    async getAllPlans (req, res) {
        try {
            const plans = await Plan.findAll({
                include: [
                    Client,
                    {
                        model: Ticket,
                        include: [
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
                            }
                        ]
                    },
                    {
                        model: Arrangement,
                        include: [
                            Hotel,
                            Agent,
                            {
                                model: Memorandum
                            },
                            // {
                            //     model: Room,
                            //     include:
                            //     [
                            //         {
                            //             model: Picklist,
                            //             as: 'RoomType'
                            //         },
                            //         {
                            //             model: Picklist,
                            //             as: 'RoomContent'
                            //         },
                            //         {
                            //             model: PassangersInRoom,
                            //             include: [Passanger]
                            //         }
                            //     ]
                            // },
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
                            }
                            // {
                            //     model: Destination,
                            //     as: 'Arrival'
                            // }
                        ]
                    }
                ],
                order: [
                    [Sequelize.col('createdAt'), 'DESC']
                ]
            });
            res.status(200).send(plans);
        } catch (err) {
            res.status(400).send({
                message: 'Nedostupan servis ' + err.toString()
            });
        }
    },

    async getPlansById (req, res) {
        try {
            var plan = await Plan.findOne(
                { where: {id: req.params.id},
                    include: [
                        Client,
                        {
                            model: Ticket,
                            include: [
                                {
                                    model: Destination,
                                    as:'Destination'
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
                                }
                            ]
                        },
                        {
                            model: Arrangement,
                            include: [
                                Hotel,
                                Agent,
                                // {
                                //     model: Room,
                                //     include:
                                //     [
                                //         {
                                //             model: Picklist,
                                //             as: 'RoomType'
                                //         },
                                //         {
                                //             model: Picklist,
                                //             as: 'RoomContent'
                                //         },
                                //         {
                                //             model: PassangersInRoom,
                                //             include: [Passanger]
                                //         }
                                //     ]
                                // },
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
                                }
                                // {
                                //     model: Destination,
                                //     as: 'Arrival'
                                // }
                            ]
                        }
                    ]
                });
            res.status(200).send(plan);
        } catch (err) {
            res.status(400).send({
                message: 'Nedostupan servis ' + err.toString()
            });
        }
    },

    async removePlansById (req, res) {
        try {
            var plan = await Plan.findOne({
                where: { id: req.params.id },
                include: [
                    Client,
                    // TODO: Implement deleting of Passangers
                    Ticket,
                    {model: Arrangement,
                        include: [
                            {
                                model: Room,
                                include: [
                                    {
                                        model: PassangersInRoom,
                                        include: [
                                            Client
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
            var ticketIds = plan.Tickets.map(el => el.id);
            if (ticketIds.length > 0) {
                await Ticket.destroy({
                    where: { id: ticketIds }
                });
            }
            var arrangementsIts = plan.Arrangements.map(el => el.id);
            // TODO: Implement deleting of Rooms
            // var arrangments = plan.Arrangements;
            // var allPassengers = [];
            // arrangments.forEach(element => {
            //     allPassengers.concat(element.ArrangementPassangers.map(el => el.id));
            // });
            // if (allPassengers.length > 0) {
            //     await ArrangementPassanger.destroy({
            //         where: { id: allPassengers }
            //     });
            // }

            if (arrangementsIts.length > 0) {
                await Arrangement.destroy({
                    where: { id: arrangementsIts }
                });
                var rooms = await Room.findAll({where: { ArrangementId: arrangementsIts }});
                var ids = rooms.map(r => r.id);
                // res.status(400).send(ids);
                await Room.destroy({where: {id: ids}, truncate: { cascade: true }});
            }

            await Plan.destroy({
                where: { id: plan.id }
            });
            res.status(200).send('Plan izbrisan');
        } catch (err) {
            res.status(400).send({
                error: err.toString()
            });
        }
    }
};
