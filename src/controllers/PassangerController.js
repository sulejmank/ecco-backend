const {Passanger, PassangersTicket, PassangersInRoom, PassangersArrangement} = require('../models');

module.exports = {
    async savePassanger (req, res) {
        var passanger = null;
        var objPassanger = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});

        if (objPassanger.id !== null) {
            try {
                passanger = await Passanger.findById(objPassanger.id);
                let updateObject = objPassanger;
                delete updateObject.id;
                if (passanger !== null) {
                    await Passanger.update(updateObject, {where: { id: objPassanger.id }});
                }
            } catch (err) {
                res.status(400).send({
                    message: ' Pri azuriranju putnika ' + err.toString()
                });
            }
        } else {
            try {
                passanger = await Passanger.create(objPassanger);
            } catch (err) {
                res.status(400).send({
                    message: ' Pri kreiranju putnika ' + err.toString()
                });
            }
        }
        try {
            PassangersTicket.create({
                PassangerId: objPassanger.id || passanger.id,
                TicketId: objPassanger.TicketId,
                brojRezervacije: objPassanger.brojRezervacije
            });
        } catch (err) {
            res.status(400).send({
                message: ' Pri kreiranju relacije izmedju Putnika i Karte ' + err.toString()
            });
        }

        res.status(200).send();
    },

    async savePassangerOnArragement (req, res) {
        var passanger = null;
        var objPassanger = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});

        if (objPassanger.id !== null) {
            try {
                passanger = await Passanger.findById(objPassanger.id);
                let updateObject = objPassanger;
                delete updateObject.id;
                if (passanger !== null) {
                    await Passanger.update(updateObject, {where: { id: objPassanger.id }});
                }
            } catch (err) {
                res.status(400).send({
                    message: ' Pri azuriranju putnika ' + err.toString()
                });
            }
        } else {
            try {
                passanger = await Passanger.create(objPassanger);
            } catch (err) {
                res.status(400).send({
                    message: ' Pri kreiranju putnika ' + err.toString()
                });
            }
        }
        try {
            PassangersArrangement.create({
                PassangerId: objPassanger.id || passanger.id,
                ArrangementId: objPassanger.ArrangementId
            });
        } catch (err) {
            res.status(400).send({
                message: ' Pri kreiranju relacije izmedju Putnika i Karte ' + err.toString()
            });
        }

        res.status(200).send();
    },

    async removeAllPassangersFromArrangement (req, res) {
        try {
            var relations = await PassangersArrangement.findAll({where: { ArrangementId: req.params.id }});
            var ids = relations.map(r => r.id);
            await PassangersArrangement.destroy({where: {id: ids}});

            res.status(200).send();
        } catch (err) {
            res.status(400).send({message: err.toString()});
        }
    },

    async setClientAsPassangerOnArrangement (req, res) {
        try {
            PassangersArrangement.create({
                ClientPassangerId: req.params.id,
                ArrangementId: req.params.arrangementId
            });
            res.status(200).send();
        } catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    },

    async savePassangerWithRoom (req, res) {
        var passanger = null;
        var objPassanger = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});

        if (objPassanger.id !== null) {
            try {
                passanger = await Passanger.findById(objPassanger.id);
                let updateObject = objPassanger;
                delete updateObject.id;
                if (passanger !== null) {
                    await Passanger.update(updateObject, {where: { id: objPassanger.id }});
                }
            } catch (err) {
                res.status(400).send({
                    message: ' Pri azuriranju putnika ' + err.toString()
                });
            }
        } else {
            try {
                passanger = await Passanger.create(objPassanger);
            } catch (err) {
                res.status(400).send({
                    message: ' Pri kreiranju putnika ' + err.toString()
                });
            }
        }

        try {
            PassangersInRoom.create({
                PassangerId: objPassanger.id || passanger.id,
                RoomId: objPassanger.RoomId
            });
            res.status(200).send();
        } catch (err) {
            res.status(400).send({
                message: ' Pri kreiranju relacije izmedju Putnika i Angazmana ' + err.toString()
            });
        }
    },

    async removeAllPassangersFromTicket (req, res) {
        try {
            var relations = await PassangersTicket.findAll({where: { TicketId: req.params.id }});
            var ids = relations.map(r => r.id);
            await PassangersTicket.destroy({where: {id: ids}});

            res.status(200).send();
        } catch (err) {
            res.status(400).send({message: err.toString()});
        }
    },

    async setClientAsPassanger (req, res) {
        try {
            PassangersTicket.create({
                ClientPassangerId: req.params.id,
                TicketId: req.params.ticketId,
                brojRezervacije: req.body.brojRezervacije
            });
            res.status(200).send();
        } catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    }
};
