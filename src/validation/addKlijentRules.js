const Joi = require('joi');

module.exports = {

    addKlijent (req, res, next) {
        const schema = {
            ime: Joi.string().regex(/^[a-zA-Z ]{3,30}$/),
            prezime: Joi.string().regex(/^[a-zA-Z ]{3,30}$/),
            email: Joi.string().email(),
            datumRodjenja: Joi.string(), // kasnije sredit
            brojTelefona: Joi.string().regex(/^[0-9+ -]{6,30}$/),
            adresa: Joi.string(),
            putnik: Joi.boolean(),
            brojPasosa: Joi.string().regex(/^[0-9+-A-Za-z ]{6,30}$/),
            struka: Joi.string().alphanum(),
            urlSlike: Joi.string()
        };

        const {error} = Joi.validate(req.body, schema);

        if (error) {
            switch (error.details[0].context.key) {
            case 'ime':
                res.status(400).send({
                    error: 'Ime nije validno'
                });
                break;
            case 'prezime':
                res.status(400).send({
                    error: 'Prezime nije validno'
                });
                break;
            case 'email':
                res.status(400).send({
                    error: 'Email nije validno'
                });
                break;
            case 'datumRodjenja':
                res.status(400).send({
                    error: 'Prezime nije validno'
                });
                break;
            case 'brojTelefona':
                res.status(400).send({
                    error: 'Broj telefona nije validan'
                });
                break;
            case 'adresa':
                res.status(400).send({
                    error: 'Adresa nije validna'
                });
                break;
            case 'brojPasosa':
                res.status(400).send({
                    error: 'Broj pasosa nije validan'
                });
                break;

            default:
                res.status(400).send({
                    error: error.toString() + 'Nevalidni podaci'
                });
                break;
            }
        } else {
            next();
        }
    }
};
