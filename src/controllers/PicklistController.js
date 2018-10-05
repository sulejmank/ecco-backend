const {Picklist} = require('../models');

module.exports = {
    async getPicklist (req, res) {
        try {
            let search = req.query.delimeter;
            var picklist = await Picklist.findAll({
                where: {
                    delimeter: {
                        $like: `%${search}%`
                    }
                }
            });
            res.send(picklist);
        } catch (err) {
            res.status(500).send({
                message: ' nedostupan servis' + err.toString()
            });
        }
    },

    async addOrUpdatePicklist (req, res) {
        let picklist = null;
        let picklistObj = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});

        if (picklistObj.id !== null) {
            try {
                picklist = await Picklist.findById(picklistObj.id);
                let updateObject = picklistObj;
                delete updateObject.id;
                if (picklist !== null) {
                    await Picklist.update(updateObject, {where: { id: req.body.id }});
                }
            } catch (err) {
                res.status(400).send({
                    message: ' Pri azuriranju opcije ' + err.toString()
                });
            }
        } else {
            try {
                picklist = await Picklist.create(picklistObj);
            } catch (err) {
                res.status(400).send({
                    message: ' Pri kreiranju opcije ' + err.toString()
                });
            }
        }
        res.status(200).send();
    },

    async deletePicklist (req, res) {
        try {
            await Picklist.destroy({where: {id: req.params.id}});
            res.status(200).send();
        } catch (err) {
            res.status(400).send({
                message: ' Pri brisanju opcije ' + err.toString()
            });
        }
    }

};
