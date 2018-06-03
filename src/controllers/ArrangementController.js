const Promise = require('bluebird');
const {Arrangement} = require('../models');
const {Sequelize} = require('../models');
const {ArrangementPassanger} = require('../models');
const {Client} = require('../models');

module.exports = {
    async addArrangement (req, res) {
        try {
            const ang = await Arrangement.create(req.body);
            res.status(200).send(ang);
        } catch (err) {
            console.log(err);
            res.send({
                err: err
            });
        }
    },

    async list (req, res) {
        try {
            const Arrangementi = await Arrangement.findAll({
                order: [
                    [Sequelize.col('createdAt'), 'DESC']
                ]
            });
            res.send(Arrangementi);
        } catch (err) {
            console.log(err);
        }
    },

    async addPassToAng (req, res) {
        try {
            await ArrangementPassanger.create({
                ArrangementId: req.body.idArrangementa,
                ClientId: req.body.idPutnika
            });
            let brPutnika = await ArrangementPassanger.findAll({
                where: {
                    ArrangementId: req.body.idArrangement
                }
            });
            await Arrangement.update(
                {
                    brojPutnika: brPutnika.length
                },
                {
                    where: {id: req.body.idArrangement}
                }
            );
            res.status(200).send();
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    },

    async removePass (req, res) {
        try {
            await ArrangementPassanger.destroy({
                where: {
                    ClientId: req.body.idPutnika
                }
            });

            let brPutnika = await ArrangementPassanger.findAll({
                where: {
                    ArrangementId: req.body.idArrangement
                }
            });

            await Arrangement.update(
                {
                    brojPutnika: brPutnika.length
                },
                {
                    where: {id: req.body.idArrangement}
                }
            );
            res.status(200).send({
                msg: 'Passanger removed from Arrangemnt'
            });
        } catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    },

    async edit (req, res) {
        try {
            await Arrangement.update(req.body, {
                where: {
                    id: req.body.id
                }
            });
            res.status(200).send({
                msg: 'Uspesno izmenjen Arrangement'
            });
        } catch (err) {
            res.send(err);
            console.log(err);
        }
    },

    async delete (req, res) {
        try {
            await Arrangement.destroy({
                where: {
                    id: req.body.id
                }
            });
            res.status(200).send({
                msg: 'Client izbrisan'
            });
        } catch (err) {
            res.status(400).send(err);
            consolelog(err);
        }
    },

    async createArranngementWithPassangers (req, res) {
      try {
        var arrangement = req.body.arrangement;
        var passangers = req.body.passangers;

        arrangement = await Arrangement.create(arrangement);

        var notRegistredPassangers = passangers.filter(pass => {
          return pass.id == undefined || pass.id == 0
        })

        registredPassangers = await Promise.map(notRegistredPassangers, passanger => Client.create(passanger))

        passangers = passangers.concat(registredPassangers)

        await Promise.map(passangers, passanger => ArrangementPassanger.create({
          ClientId: passanger.id,
          ArrangementId: arrangement.id
        }))

          res.status(200).send({
              msg: "Succesfully Created Arrangement",
              arrangement: arrangement,
              passangers: passangers
          });
      } catch (err) {
          res.status(400).send(err);
          console.log(err);
      }
  }
};
