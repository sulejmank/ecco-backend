const {Client} = require('../models');

module.exports = {
    async addClient (req, res) {
      let clientExists = null;
      if (req.body.id !== undefined) {
        try {
          var id = req.body.id
          delete req.body.id
          clientExists = await Client.findById(id);

          if (clientExists !== null) {
              await Client.update(req.body, {where: { id: id }});
              req.body.id = id
              res.status(200).send(req.body);
          }
        } catch (err) {
          res.status(400).send({
              error: err.toString()
          });
        }
      } else {
        try {
          let client = await Client.create(req.body);
          res.status(201).send(client);
        } catch (err) {
          res.status(400).send({
              error: err.toString()
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
            res.status(500).send(err);
        }
    },

    async list (req, res) {
        try {
            const Clients = await Client.findAll();
            res.send(Clients);
        } catch (err) {
            res.status(500).send({
                error: err.toString()
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
                msg: 'Uspesno izmenjen Client'
            });
        } catch (err) {
            res.send(err);
            console.log(err);
        }
    },

    async delete (req, res) {
        try {
            await Client.destroy({
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
    },

    async getClientById (req, res) {
      try {
          var client = await Client.findOne({ where: {id: req.params.id}});
          res.status(200).send(client);
      } catch (err) {
          res.status(400).send(err);
          console.log(err);
      }
    }
};
