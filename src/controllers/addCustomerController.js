const {Customer} = require('../models');

module.exports = {
    async addCustomer(req,res) {
        try {
            const customer = await Customer.create(req.body);
            res.send(customer.toJSON());
        } catch(err) {
            res.status(400).send({
                error:'Broj pasosa ili broj telefona vec postoji!'
            });
        }
    }
}