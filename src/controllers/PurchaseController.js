const {Customer} = require('../models');
const {Plan} = require('../models');
const {AvioKarta} = require('../models');
const {Rata} = require('../models');
const Promise = require('bluebird');

module.exports = {
    async makePurchase(req,res) {
        const produkti = req.body.produkti;
        const rate = req.body.rate;
        
        try {
            const plan = await Plan.create({
                avans: req.body.avans,
                totalnaCena: req.body.totalnaCena,
                status: false,
                CustomerId: req.body.idMusterije
            }); 
            
            Promise.map(produkti, produkt => AvioKarta.create(produkt))
            .then(() => {

                Promise.map(rate, rata => Rata.create({ 
                    datum: rata.rokUplate,
                    iznos: rata.iznos,
                    status: false,
                    PlanId: plan.id
                }))
            })
            .catch(err => console.log(err));

            res.status(200).send({
                msg: "uspesno"
            });

        } catch(err) {
            console.error(err);
            res.status(400).send({
                error: err
            });
        }
    }
}