const {Destination} = require('../models');

module.exports = {
    async addDestination (req, res) {
        var objDestination = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});
        let similarDestinations = await Destination.findOne({
            where: {
                google_id: objDestination.id
            }
        });
        if (similarDestinations != null) {
            res.status(200).send({
                id: similarDestinations.id
            });
        } else {
            let destination = await Destination.create({
                destinacija: objDestination.description,
                google_id: objDestination.id
            });
            res.status(200).send({
                id: destination.id
            });
        }
    },

    async list (req, res) {
        let destinations = await Destination.findAll();
        res.status(200).send(destinations);
    }
};
