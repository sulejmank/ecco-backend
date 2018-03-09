const Joi = require('joi');

module.exports = {
    addAvioKarta(req, res, next){
        const schema = {

            putovanjeOd: Joi.string().regex(/^[a-zA-Z ]{3,30}$/),
            putovanjeDo: Joi.string().regex(/^[a-zA-Z ]{3,30}$/),
            jedanPravac: Joi.boolean(),
            datumPolaska: Joi.string(),
            datumDolaska: Joi.string(),
            brojRezervacije: Joi.string().alphanum(),
            avioKompanija: Joi.string().regex(/^[a-zA-Z ]{3,30}$/),
            potvrdjeno: Joi.boolean(),
            cena: Joi.string().regex(/^[0-9/.,]{3,30}$/),
            datumRezervacije: Joi.string()
            
        }

        const {error, value} = Joi.validate(req.body, schema);

        if(error) {
            switch (error.details[0].context.key) {
                case 'putovanjeOd':
                    res.status(400).send({
                        error:'Mesto polaska nije validno'
                    })
                    break;
                case 'putovanjeDo':
                    res.status(400).send({
                        error:'Destinacija nije validna'
                    })
                    break;
                case 'jedanPravac':
                    res.status(400).send({
                        error:'Pravac nije validan'
                    })
                    break;
                case 'datumPolaska':
                    res.status(400).send({
                        error:'Datum polaska  nije validan'
                    })
                    break;
                case 'datumDolaska':
                    res.status(400).send({
                        error:'Datum dolaska nije validan'
                    })
                    break;
                case 'brojRezervacije':
                    res.status(400).send({
                        error:'Broj pasosa nije validan'
                    })
                    break;
                case 'avioKompanija':
                    res.status(400).send({
                        error:'Naziv aviokompanije nije validan'
                    })
                    break;
                case 'potvrdjeno':
                    res.status(400).send({
                        error:'Potvrdjeno polje nije validno'
                    })
                    break;
                case 'cena':
                    res.status(400).send({
                        error:'Cena nije validna'
                    })
                    break; 
                case 'datumRezervacije':
                    res.status(400).send({
                        error:'Datum rezervacije nije validan'
                    })
                    break;

                default:
                    res.status(400).send({
                        error: error.toString() + "Nevalidni podaci"
                    })
                    break;
            }
        }
        else {
            next();
        }
    }
}
