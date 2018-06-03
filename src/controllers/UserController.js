const {User, Sequelize} = require('../models');

const Op = Sequelize.Op;

module.exports = {
    async login (req, res) {
        console.log(req.session.user);
        try {
            var user = await User.findOne({
                where: {
                    [Op.and]: [{
                        password: req.query.password
                    }, {
                        username: req.query.username
                    }]
                }
            });
            if (user !== undefined) {
                var userSess = { id: user.id, username: user.username };
                req.session.user = userSess;
                req.session.save();
                console.log(req.session.user);
                res.status(200).send(userSess);
            } else {
                res.status(404).send({
                    msg: 'Invalid login'
                });
            }
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }
};
