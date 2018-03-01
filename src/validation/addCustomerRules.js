const Joi = require('joi');

module.exports = {

    addCustomer(req,res,next) {
        const schema = {
            ime: Joi.string().regex(/^[a-zA-Z]{3,30}$/),
            prezime:Joi.string().regex(/^[a-zA-Z]{3,30}$/),
            datumRodjenja:Joi.string(),
            brojTelefona:Joi.string().regex(/^[0-9+-]{6,30}$/),
            adresa:Joi.string()
        }

        // baci pogled na ovu validaciju, ima li jos kakvih zahteva sto se validacije tice

        const {error, value} = Joi.validate(req.body,schema);

        if(error) {
            switch (error.details[0].context.key) {
                case 'ime':
                    res.status(400).send({
                        error:'Ime nije validno'
                    })
                    break;
                case 'prezime':
                    res.status(400).send({
                        error:'Ime nije validno'
                    })
                    break;
                case 'datumRodjenja':
                    res.status(400).send({
                        error:'Prezime nije validno'
                    })
                    break;
                case 'brojTelefona':
                    res.status(400).send({
                        error:'Broj telefona nije validan'
                    })
                    break;
                case 'adresa':
                    res.status(400).send({
                        error:'Adresa nije validna'
                    })
                    break;
                default:
                    res.status(400).send({
                        error: error.toString() + "Nevalidni podaci"
                    })
                    break;
            }
        } else {
            next();
        }
    }
}