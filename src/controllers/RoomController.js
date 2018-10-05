const { Room } = require('../models');

module.exports = {

    async addRoom (req, res) {
        var objRoom = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});
        // console.log('\n =============', objRoom, '============ \n');
        try {
            var room = await Room.create(objRoom);
            console.log('\n =============', room.id, '============ \n');
            res.status(200).send({id: room.id});
        } catch (e) {
            res.status(400).send({message: 'Neuspesno kreiranje sobe ' + e.toString()});
        }
    },

    async removeAllRoomsFromArrangement (req, res) {
        try {
            var rooms = await Room.findAll({where: { ArrangementId: req.params.id }});
            var ids = rooms.map(r => r.id);
            // res.status(400).send(ids);
            await Room.destroy({where: {id: ids}, truncate: { cascade: true }});
            // await PassangersInRoom.destroy({where: {RoomId: ids}, truncate: true});
            res.status(200).send();
        } catch (err) {
            res.status(400).send({message: err.toString()});
        }
    }
};
