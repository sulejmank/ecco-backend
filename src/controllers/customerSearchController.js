const {Customer} = require('../models');

module.exports = {
    async searchCustomer(req, res) {
        try {

            let customers = null;
            const search = req.query.search; // 

            if(search){
                customers = await Customer.findAll({
                    where: {
                        $or: [
                            'ime', 'prezime' // za sad je u jednoj ruti, po potrebi podeliti na dve
                        ].map(key => ({
                             [key]: search
                        }))
                    }
                })
            } else {
                customers = await Customer.findAll({ // u slucaju da mi posaljes empty string za pretragu, vracam poslednjih 20 redova
                    limit:20
                })
            }

            res.send(customers);

        } catch(err){
            res.status(500).send({
                error: err.toString()                
            })
        }
    }
}