const {Klijent} = require('../models');
const {Plan} = require('../models');
const {AvioKarta} = require('../models');
const {Rata} = require('../models');
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
            KlijentId: req.body.idMusterije
        });

        Promise.map(produkti, produkt => AvioKarta.create({
            putovanjeOd: produkt.putovanjeOd,
            putovanjeDo: produkt.putovanjeDo,
            potvrdjeno: produkt.potvrdjeno,
            datumPolaska: produkt.datumPolaska,
            datumDolaska: produkt.datumDolaska,
            cena: produkt.cena,
            avioKompanija: produkt.avioKompanija,
            brojRezervacije: produkt.brojRezervacije,
            jedanPravac: produkt.jedanPravac,
            KlijentId: produkt.idPutnika,
            PlanId: plan.id
        }))
            .then(() => {
                Promise.map(rate, rata => Rata.create({
                    datum: rata.rokUplate,
                    iznos: rata.iznos,
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
                podaci.musterije = await Klijent.findAll({
                    limit: x
                });

                for (let i = 0; i < podaci.musterije.length; i++) {
                    podaci.musterije[i].dataValues.produkti = await Plan.findAll({
                        where: {
                            KlijentId: podaci.musterije[i].id
                        }
                    });
                    for (let j = 0; j < podaci.musterije[i].dataValues.produkti.length; j++) {
                        podaci.musterije[i].dataValues.produkti[j].dataValues.rate = await Rata.findAll({
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
                podaci.musterije = await Klijent.findAll({
                    limit: 20,
                    order: [
                        [Sequelize.col('createdAt'), 'DESC']
                    ]
                });

                for (let i = 0; i < podaci.musterije.length; i++) {
                    podaci.musterije[i].dataValues.produkti = await Plan.findAll({
                        where: {
                            KlijentId: podaci.musterije[i].id
                        },
                        order: [
                            [Sequelize.col('createdAt'), 'DESC']
                        ]
                    });
                    for (let j = 0; j < podaci.musterije[i].dataValues.produkti.length; j++) {
                        podaci.musterije[i].dataValues.produkti[j].dataValues.rate = await Rata.findAll({
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
