const {Client} = require('../models');
const {Plan} = require('../models');
const {Ticket} = require('../models');
const {Installment} = require('../models');
const {Sequelize} = require('../models');
const Promise = require('bluebird');

module.exports = {
    async makePurchase (req, res) {
        const produkti = req.body.produkti;
        const rate = req.body.rate;

        const plan = await Plan.create({
            avans: req.body.avans,
            totalnaCena: req.body.totalnaCena,
            status: false,
            ClientId: req.body.idMusterije
        });

        Promise.map(produkti, produkt => Ticket.create({
            putovanjeOd: produkt.putovanjeOd,
            putovanjeDo: produkt.putovanjeDo,
            potvrdjeno: produkt.potvrdjeno,
            datumPolaska: produkt.datumPolaska,
            datumDolaska: produkt.datumDolaska,
            cena: produkt.cena,
            avioKompanija: produkt.avioKompanija,
            brojRezervacije: produkt.brojRezervacije,
            jedanPravac: produkt.jedanPravac,
            ClientId: produkt.idPutnika,
            PlanId: plan.id
        }))
            .then(() => {
                Promise.map(rate, Installment => Installment.create({
                    datum: Installment.rokUplate,
                    iznos: Installment.iznos,
                    status: false,
                    PlanId: plan.id
                }));
            })
            .then(() => {
                res.status(200).send({
                    msg: 'uspesno'
                });
            })
            .catch((err) => {
                console.error(err);
                res.status(400).send({
                    error: err
                });
            });
    },

    async newPurchases (req, res) {
        // todo
    },

    async purchases (req, res) { // refactor
        let x = parseInt(req.query.input);
        var podaci = {};

        if (x) {
            try {
                podaci.musterije = await Client.findAll({
                    limit: x
                });

                for (let i = 0; i < podaci.musterije.length; i++) {
                    podaci.musterije[i].dataValues.produkti = await Plan.findAll({
                        where: {
                            ClientId: podaci.musterije[i].id
                        }
                    });
                    for (let j = 0; j < podaci.musterije[i].dataValues.produkti.length; j++) {
                        podaci.musterije[i].dataValues.produkti[j].dataValues.rate = await Installment.findAll({
                            where: {
                                PlanId: podaci.musterije[i].dataValues.produkti[j].id
                            }
                        });
                    }
                }
                res.status(200).send(podaci);
            } catch (err) {
                console.log(err);
                res.status(400).send({
                    error: err
                });
            }
        } else {
            try {
                podaci.musterije = await Client.findAll({
                    limit: 20,
                    order: [
                        [Sequelize.col('createdAt'), 'DESC']
                    ]
                });

                for (let i = 0; i < podaci.musterije.length; i++) {
                    podaci.musterije[i].dataValues.produkti = await Plan.findAll({
                        where: {
                            ClientId: podaci.musterije[i].id
                        },
                        order: [
                            [Sequelize.col('createdAt'), 'DESC']
                        ]
                    });
                    for (let j = 0; j < podaci.musterije[i].dataValues.produkti.length; j++) {
                        podaci.musterije[i].dataValues.produkti[j].dataValues.rate = await Installment.findAll({
                            where: {
                                PlanId: podaci.musterije[i].dataValues.produkti[j].id
                            },
                            order: [
                                [Sequelize.col('createdAt'), 'DESC']
                            ]
                        });
                    }
                }
                res.status(200).send(podaci);
            } catch (err) {
                console.log(err);
                res.status(400).send({
                    error: err
                });
            }
        }
    }
};
