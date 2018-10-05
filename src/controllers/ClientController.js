const {Client} = require('../models');

module.exports = {
    async addClient (req, res) {
        let clientExists = null;
        var objClient = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});
        if (objClient.id !== null) {
            try {
                var id = req.body.id;
                delete objClient.id;
                clientExists = await Client.findById(id);

                if (clientExists !== null) {
                    await Client.update(objClient, {where: { id: id }});
                    objClient.id = id;
                    res.status(200).send(objClient);
                }
            } catch (err) {
                res.status(400).send({
                    message: err.toString()
                });
            }
        } else {
            try {
                let client = await Client.create(objClient);
                res.status(201).send(client);
            } catch (err) {
                res.status(400).send({
                    message: err.toString()
                });
            }
        }
    },

    async putnik (req, res) {
        try {
            const putnik = await Client.findAll({
                where: {
                    id: req.body.id
                }
            });
            res.status(200).send(putnik);
        } catch (err) {
            console.log(err);
            res.status(500).send({
                message: err.toString()
            });
        }
    },

    async list (req, res) {
        try {
            const Clients = await Client.findAll();
            res.send(Clients);
        } catch (err) {
            res.status(500).send({
                message: err.toString()
            });
        }
    },

    async edit (req, res) {
        try {
            await Client.update(req.body, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).send({
                message: 'Uspesno izmenjen Client'
            });
        } catch (err) {
            res.send(err);
            console.log(err);
        }
    },

    async delete (req, res) {
        var id = parseInt(req.params.id);
        try {
            await Client.destroy({
                where: {
                    id: id
                }
            });
            res.status(200).send({
                message: 'Client izbrisan'
            });
        } catch (err) {
            console.log(err);
            res.status(400).send({message: err});
        }
    },

    async getClientById (req, res) {
        try {
            var client = await Client.findOne({
                where: {id: req.params.id}
            });
            res.status(200).send(client);
        } catch (err) {
            console.log(err);
            res.status(400).send({
                message: err.toString()
            });
        }
    }
};
