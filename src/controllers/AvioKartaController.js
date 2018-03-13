const {AvioKarta} = require('../models');

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
}