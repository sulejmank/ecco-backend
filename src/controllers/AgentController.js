const {Agent} = require('../models');

module.exports = {
    async addAgent (req, res) {
        var agentExists = null;
        var objAgent = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});
        if (objAgent.id !== null) {
            try {
                var id = req.body.id;
                delete objAgent.id;
                agentExists = await Agent.findById(id);

                if (agentExists !== null) {
                    await Agent.update(objAgent, {where: { id: id }});
                    objAgent.id = id;
                    res.status(200).send(objAgent);
                }
            } catch (err) {
                res.status(400).send({
                    message: err.toString()
                });
            }
        } else {
            try {
                let agent = await Agent.create(objAgent);
                res.status(201).send(agent);
            } catch (err) {
                res.status(400).send({
                    message: err.toString()
                });
            }
        }
    },

    async getAgents (req, res) {
        try {
            let agents = await Agent.findAll();
            res.status(200).send(agents);
        } catch (err) {
            res.status(400).send({
                message: err.toString()
            });
        }
    },

    async deleteAgent (req, res) {
        try {
            await Agent.destroy({where: {id: req.params.id}});
            res.status(200).send();
        } catch (err) {
            res.status(400).send({
                message: ' Pri brisanju agenta ' + err.toString()
            });
        }
    }
};
