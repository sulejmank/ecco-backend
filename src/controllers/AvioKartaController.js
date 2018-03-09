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

            console.error(err);
        }
    }
}