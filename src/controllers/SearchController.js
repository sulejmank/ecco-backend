const {Klijent} = require('../models');
const axios = require('axios');

module.exports = {
    async searchKlijent (req, res) {
        try {
            let Klijents = null;
            let search = req.query.search;

            if (search) {
                Klijents = await Klijent.findAll({
                    where: {
                        $or: [
                            'ime', 'prezime'
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`
                            }
                        }))
                    }
                });
            } else {
                Klijents = await Klijent.findAll({
                    limit: 20
                });
            }
            res.send(Klijents);
        } catch (err) {
            res.status(500).send({
                error: err.toString()
            });
        }
    },

    async searchPlace (req, res) {
        try {
            let keyword = req.query.input;
            let respons = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyD26SxqE4hlzjbpJ99pFOdrSv62c_Bjgx8&input=' + encodeURI(keyword));

            res.send(respons.data.predictions);
        } catch (err) {
            res.status(500).send({
                error: err.toString()
            });
        }
    }

};
