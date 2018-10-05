const {Installment} = require('../models');
const {Sequelize} = require('../models');

const Op = Sequelize.Op;

module.exports = {
    async list (req, res) {
        let datum = new Date();
        let mesec = new Date();
        mesec.setMonth(datum.getMonth() + 1);

        const rate = await Installment.findAll({
            where: {
                [Op.or]: [{
                    datum: {
                        $between: [datum, mesec]
                    }
                }, {
                    [Op.and]: [
                        {status: false}, {
                            datum: {
                                lt: datum
                            }
                        }
                    ]
                }]
            },
            order: ['datum']
        })
            .then(() => {
                res.status(200).send(rate);
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send({
                    error: err
                });
            });
    },

    async platiRatu (req, res) {
        await Installment.update(
            {status: true},
            {
                where: {id: req.body.id}
            })
            .then(() => {
                res.status(200).send({
                    msg: 'Installment placena'
                });
            })
            .catch((err) => {
                res.status(400).send({
                    error: err
                });
                console.log(err);
            });
    }
};
