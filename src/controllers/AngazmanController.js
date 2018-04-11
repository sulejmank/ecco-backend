const {Angazman} = require('../models');
const {Sequelize} = require('../models');
const {AngazmanPutnici} = require('../models');

module.exports = {
    async addAngazman (req, res) {
        try {
            const ang = await Angazman.create(req.body);
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
            const angazmani = await Angazman.findAll({
                order: [
                    [Sequelize.col('createdAt'), 'DESC']
                ]
            });
            res.send(angazmani);
        } catch (err) {
            console.log(err);
        }
    },

    async addPassToAng (req, res) {
        try {
            await AngazmanPutnici.create({
                idAngazmana: req.body.idAngazmana,
                idPutnika: req.body.idPutnika
            });
            let brPutnika = await AngazmanPutnici.findAll({
                where: {
                    idAngazmana: req.body.idAngazmana
                }
            });
            await Angazman.update(
                {
                    brojPutnika: brPutnika.length
                },
                {
                    where: {id: req.body.idAngazmana}
                }
            );
            res.status(200).send();
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }

};
