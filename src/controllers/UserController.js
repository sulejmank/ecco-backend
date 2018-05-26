const {User, Sequelize} = require('../models');

const Op = Sequelize.Op;

module.exports = {
    async login (req, res) {
        try {
            const user = await User.findAll({
                where: {
                    [Op.and]: [{
                        password: req.body.password
                    }, {
                        username: req.body.username
                    }]
                }
            });
            if (user !== null) {
                res.status(200).send(user);
            } else {
                res.status(404).send({
                    msg: 'Invalid login'
                });
            }
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
    }
};
