const {Plan} = require('../models');

module.exports = {
    async addPlan (req, res) {
        try {
            const plan = await Plan.create(req.body);
            res.status(200).send(plan.id.toString());
        } catch (err) {
            res.status(400).send({
                error: err.toString()
            });
        }
    }
};
