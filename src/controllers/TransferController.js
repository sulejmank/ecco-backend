const {Transfer} = require('../models');

module.exports = {
    async addTransfer (req, res) {
        try {
            const transfer = await Transfer.create(req.body);
            res.status(200).send(transfer);
        } catch (err) {
            console.log(err);
            res.status(400).send(err);
        }
    }
};
