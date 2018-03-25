const {Klijent} = require('../models');

module.exports = {
    async addKlijent (req, res) {
        try {
            const klijent = await Klijent.create(req.body);
            res.send(klijent);
        } catch (err) {
            res.status(400).send({
                error: err.toString()
            });
        }
    },

    async list (req, res) {
        try {
            const Klijents = await Klijent.findAll();
            res.send(Klijents);
        } catch (err) {
            res.status(500).send({
                error: err.toString()
            });
        }
    }
};
