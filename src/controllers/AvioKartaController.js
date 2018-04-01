const {AvioKarta} = require('../models');
const {Sequelize} = require('../models');
const {Klijent} = require('../models');
const {Plan} = require('../models');

const Op = Sequelize.Op;

module.exports = {
    async addAvio (req, res) {
        try {
            const plan = await Plan.create({
                totalnaCena: req.body.cena,
                KlijentId: req.body.idPutnika
            });

            const avio = await AvioKarta.create({
                putovanjeOd: req.body.putovanjeOd,
                putovanjeDo: req.body.putovanjeDo,
                jedanParvac: req.body.jedanParvac,
                datumPolaska: req.body.datumPolaska,
                datumDolaska: req.body.datumDolaska,
                brojRezervacije: req.body.brojRezervacije,
                avioKompanija: req.body.avioKompanija,
                potvrdjeno: req.body.potvrdjeno,
                cena: req.body.cena,
                datumRezervacije: req.body.datumRezervacije,
                KlijentId: req.body.idPutnika,
                PlanId: plan.id
            });
            res.send(avio.id.toString());
        } catch (err) {
            res.status(500).send({
                error: err.toString()
            });
        }
    },

    async list (req, res) {
        // let podaci = {};
        try {
            let karte = await AvioKarta.findAll({
                order: [
                    [Sequelize.col('createdAt'), 'DESC']
                ]
            });
        /*    //console.log(podaci);
            for (let i = 0; i < podaci.karte.length; i++) {
                podaci.karte[i].AvioKarta.dataValues.Putnik = Klijent.findAll({
                    where: {
                        id: podaci.karta[i].AvioKarta.KlijentId
                    }
                });
            } */    
            res.status(200).send(karte);
        } catch (err) {
            res.send(err);
        }
    },

    async checkKarte (req, res) {
        let datum = new Date();
        let datum2 = new Date();
        datum.setHours(datum.getHours() + 48);

        try {
            const karte = await AvioKarta.findAll({
                where: {
                    [Op.and]: [{
                        datumPolaska:
                        {
                            $between: [datum2, datum]
                        }
                    }, {
                        potvrdjeno: false
                    }
                    ]}
            });
            res.status(200).send(karte);
        } catch (err) {
            res.status(400).send(err);
        }
    },

    async potvrdiKartu (req, res) {
        console.log(req);
        await AvioKarta.update(
            {
                potvrdjeno: true
            },
            {
                where: {id: req.body.id}
            })
            .then(() => {
                res.status(200).send({
                    msg: 'Karta cekirana'
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send({
                    error: err
                });
            });
    }
};
