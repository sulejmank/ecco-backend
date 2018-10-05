const {
    Arrangement,
    PassangersArrangement,
    Client,
    Picklist,
    Plan,
    Passanger,
    Destination,
    Sequelize,
    Hotel,
    Agent,
    Payment
} = require('../models');

module.exports = {
    async addArrangement (req, res) {
        var objArrangement = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});
        try {
            var ang = await Arrangement.create(objArrangement);
            res.status(200).send(ang);
        } catch (e) {
            res.status(400).send({message: 'Neuspesno kreiranje angazmana ' + e.toString()});
        }
    },

    async list (req, res) {
        try {
            const arrangements = await Arrangement.findAll({
                order: [
                    [Sequelize.col('createdAt'), 'DESC']
                ],
                include: [
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
                        model: Client
                    },
                    {
                        model: Plan,
                        include: [
                            Payment
                        ]
                    },
                    Hotel,
                    Agent,
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
                ]
            });
            res.send(arrangements);
        } catch (err) {
            console.log({message: err.toString()});
            res.status(500).send(err.toString());
        }
    },

    async edit (req, res) {
        var objArrangement = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});
        try {
            delete objArrangement.id;
            await Arrangement.update(objArrangement, {
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
            await Arrangement.destroy({
                where: {
                    id: req.body.id
                }
            });
            res.status(200).send({
                msg: 'Arrangement izbrisan'
            });
        } catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    }
};
