const {Plan, Client, FlightTicket, Arrangement, ArrangementPassanger} = require('../models');

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

    },
    async getAllPlans (req, res) {
      try {
        const plans = await Plan.findAll({
          include: [
            Client,
            FlightTicket,
            Arrangement
          ]
        });
        res.status(200).send(plans);
      } catch (err) {
          res.status(400).send({
              error: err.toString()
          });
      }
    },

    async getPlansById (req, res) {
      try {
        var plan = await Plan.findOne(
          { where: {id: req.params.id},
          include: [
            Client,
            FlightTicket,
            {model: Arrangement, include: [ { model:ArrangementPassanger, attributes: ['id'], include: [Client] }] 
            }
          ]
        });
        res.status(200).send(plan);
      } catch (err) {
          res.status(400).send({
              error: err.toString()
          });
      }
    }
};
