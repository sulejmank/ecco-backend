const {AvioKarta} = require('../models');
const {Sequelize} = require('../models');

const Op = Sequelize.Op;

module.exports = {
    async addAvio(req, res) {
        try {
            const avio = await AvioKarta.create(req.body);
            res.send(avio.id.toString());
        } catch(err) {
            res.status(500).send({
                error: err.toString()
            });

        }
    },

    async checkKarte(req, res) {     
        let datum = new Date();
        let datum2 = new Date();
        datum.setHours(datum.getHours() + 48);
        try {
        const karte = await AvioKarta.findAll({
            where: {
            [Op.and]: [{
                datumPolaska: {
                    $between: [datum2,datum]
                }
            },{
                potvrdjeno: false
            }]
        }
        });
        
            res.status(200).send(karte);
        }
        catch( err ){
            res.send(err);
        }
    },

    async potvrdiKartu(req, res) {
        const karta = await AvioKarta.update(
            {potvrdjeno: true },
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