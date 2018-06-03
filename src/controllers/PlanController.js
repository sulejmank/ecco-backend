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
    },

    async updatePlan (req, res) {
      try {
        const plan = await Plan.findById(req.body.id);
        if (plan !== null) {
            await plan.update(req.body);
            res.status(200).send({
                plan: plan
            });
          }
          res.status(200).send(plan.id.toString());
      } catch (err) {
          res.status(400).send({
              error: err.toString()
          });
      }
  }
};
