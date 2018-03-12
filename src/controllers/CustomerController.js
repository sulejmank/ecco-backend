const {Customer} = require('../models');

module.exports = {
    async addCustomer(req,res) {  
        try {
            const customer = await Customer.create(req.body);
            res.send(customer.id.toString()); 
        } catch(err) {
            res.status(400).send({
                error:err.toString()
            });
        }
    },

    async list(req, res) {
        try {
            const customers = await Customer.findAll();
            res.send(customers);
        } catch(err) {
            res.status(500).send({
                error: err.toString()
            });
        }
    }
}