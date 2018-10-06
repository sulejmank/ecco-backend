const {Client, Passanger, Company, Agent, Hotel} = require('../models');
const axios = require('axios');

module.exports = {
    async searchClient (req, res) {
        try {
            let Clients = null;
            let search = req.query.search;

            if (search) {
                Clients = await Client.findAll({
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
                Clients = await Client.findAll({
                    limit: 20
                });
            }
            res.send(Clients);
        } catch (err) {
            res.status(500).send({
                message: err.toString()
            });
        }
    },

    async searchPlace (req, res) {
        try {
            let keyword = req.query.input;
            let respons = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyD26SxqE4hlzjbpJ99pFOdrSv62c_Bjgx8&input=' + encodeURI(keyword) + '&language=sr');

            res.send(respons.data.predictions);
        } catch (err) {
            res.status(500).send({
                message: err.toString()
            });
        }
    },

    async searchPassanger (req, res) {
        try {
            let passangers = null;
            let search = req.query.search;

            if (search) {
                passangers = await Passanger.findAll({
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
                passangers = await Passanger.findAll({
                    limit: 20
                });
            }
            res.send(passangers);
        } catch (err) {
            res.status(500).send({
                message: err.toString()
            });
        }
    },

    async searchCompany (req, res) {
        try {
            let companies = null;
            let search = req.query.search;

            if (search) {
                companies = await Company.findAll({
                    where: {
                        name: {
                            $like: `%${search}%`
                        }
                    }
                });
            } else {
                companies = await Company.findAll({
                    limit: 20
                });
            }
            res.send(companies);
        } catch (err) {
            res.status(500).send({
                message: err.toString()
            });
        }
    },

    async searchAgent (req, res) {
        try {
            let agents = null;
            let search = req.query.search;

            if (search) {
                agents = await Agent.findAll({
                    where: {
                        name: {
                            $like: `%${search}%`
                        }
                    }
                });
            } else {
                agents = await Agent.findAll({
                    limit: 20
                });
            }
            res.send(agents);
        } catch (err) {
            res.status(500).send({
                message: err.toString()
            });
        }
    },

    async searchHotel (req, res) {
        try {
            let hotels = null;
            let search = req.query.search;

            if (search) {
                hotels = await Hotel.findAll({
                    where: {
                        name: {
                            $like: `%${search}%`
                        }
                    }
                });
            } else {
                hotels = await Hotel.findAll({
                    limit: 20
                });
            }
            res.send(hotels);
        } catch (err) {
            res.status(500).send({
                message: err.toString()
            });
        }
    }

};
