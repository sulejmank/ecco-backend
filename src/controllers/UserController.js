const {User, Sequelize} = require('../models');

const Op = Sequelize.Op;

module.exports = {
    async login (req, res) {
        try {
            var user = await User.findOne({
                where: {
                    [Op.and]: [{
                        password: req.body.password
                    }, {
                        username: req.body.username
                    }]
                }
            });
            if (user !== null) {
                var userSess = { id: user.id, username: user.username };
                req.session.user = userSess;
                req.session.save();
                res.status(200).send(userSess);
            } else {
                res.status(404).send({
                    message: 'Neuspešno logovanje!'
                });
            }
        } catch (err) {
            res.status(500).send(err.toString());
        }
    },

    async logout (req, res) {
        req.session = null;
        res.status(200).send();
    },

    async isLoggedIn (req, res) {
        if (req.user !== undefined) {
            res.status(200).send();
        } else {
            res.status(404).send({
                msg: 'Invalid login'
            });
        }
    },

    async list (req, res) {
        let users = await User.findAll();
        res.status(200).send(users);
    },

    async addOrUpdateUser (req, res) {
        let user = null;
        let userObj = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});

        if (userObj.id !== null) {
            try {
                user = await User.findById(userObj.id);
                let updateObject = userObj;
                delete updateObject.id;
                if (user !== null) {
                    await User.update(updateObject, {where: { id: req.body.id }});
                }
            } catch (err) {
                res.status(400).send({
                    message: ' Pri azuriranju korisnika ' + err.toString()
                });
            }
        } else {
            try {
                user = await User.create(userObj);
            } catch (err) {
                res.status(400).send({
                    message: ' Pri kreiranju korisnika ' + err.toString()
                });
            }
        }
        res.status(200).send();
    },

    async removeUser (req, res) {
        try {
            await User.destroy({where: {id: req.params.id}});
            res.status(200).send();
        } catch (err) {
            res.status(400).send({
                message: ' Pri kreiranju korisnika ' + err.toString()
            });
        }
    }
};
