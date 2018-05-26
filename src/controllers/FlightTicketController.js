const {FlightTicket} = require('../models');
const {Sequelize} = require('../models');

const Op = Sequelize.Op;

module.exports = {
    async addAvio (req, res) {
        try {
            const avio = await FlightTicket.create({
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
                KlijentId: req.body.CustomerId
            });
            res.send(avio.id.toString());
        } catch (err) {
            res.status(500).send({
                error: err.toString()
            });
        }
    },

    async list (req, res) {
        let podaci = {};
        try {
            podaci.karte = await FlightTicket.findAll({
                order: [
                    [Sequelize.col('createdAt'), 'DESC']
                ]
            });
            res.status(200).send(podaci);
        } catch (err) {
            res.send(err);
        }
    },

    async checkKarte (req, res) {
        let datum = new Date();
        let datum2 = new Date();
        datum.setHours(datum.getHours() + 48);

        try {
            const karte = await FlightTicket.findAll({
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
        await FlightTicket.update(
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
    },

    async edit (req, res) {
        try {
            await FlightTicket.update(req.body, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).send({
                msg: 'Uspesno izmenjen Client'
            });
        } catch (err) {
            res.send(err);
            console.log(err);
        }
    },

    async delete (req, res) {
        try {
            await FlightTicket.destroy({
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
    }
};
