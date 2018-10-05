const { Hotel } = require('../models');

module.exports = {
    async addHotel (req, res) {
        var hotelExists = null;
        var objHotel = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});

        if (objHotel.id !== null) {
            try {
                var id = req.body.id;
                delete objHotel.id;
                hotelExists = await Hotel.findById(id);

                if (hotelExists !== null) {
                    await Hotel.update(objHotel, {where: { id: id }});
                    objHotel.id = id;
                    res.status(200).send(objHotel);
                }
            } catch (err) {
                res.status(400).send({
                    message: err.toString()
                });
            }
        } else {
            try {
                let hotel = await Hotel.create(objHotel);
                res.status(201).send(hotel);
            } catch (err) {
                res.status(400).send({
                    message: err.toString()
                });
            }
        }
    },

    async getHotels (req, res) {
        try {
            let hotels = await Hotel.findAll();
            res.status(200).send(hotels);
        } catch (err) {
            res.status(400).send({
                message: err.toString()
            });
        }
    },

    async deleteHotel (req, res) {
        try {
            await Hotel.destroy({where: {id: req.params.id}});
            res.status(200).send();
        } catch (err) {
            res.status(400).send({
                message: ' Pri brisanju hotela ' + err.toString()
            });
        }
    }
};
