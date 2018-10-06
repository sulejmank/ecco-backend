const {Company} = require('../models');

module.exports = {
    async addCompany (req, res) {
        var companyExists = null;
        var objCompany = Object.keys(req.body).reduce((accu, e) => {
            accu[e] = req.body[e] !== '' ? req.body[e] : null;
            return accu;
        }, {});
        if (objCompany.id !== null) {
            try {
                var id = req.body.id;
                delete objCompany.id;
                companyExists = await Company.findById(id);

                if (companyExists !== null) {
                    await Company.update(objCompany, {where: { id: id }});
                    objCompany.id = id;
                    res.status(200).send(objCompany);
                }
            } catch (err) {
                res.status(400).send({
                    message: err.toString()
                });
            }
        } else {
            try {
                let company = await Company.create(objCompany);
                res.status(201).send(company);
            } catch (err) {
                res.status(400).send({
                    message: err.toString()
                });
            }
        }
    },

    async getCompanies (req, res) {
        try {
            let companies = await Company.findAll();
            res.status(200).send(companies);
        } catch (err) {
            res.status(400).send({
                message: err.toString()
            });
        }
    },

    async deleteCompany (req, res) {
        try {
            await Company.destroy({where: {id: req.params.id}});
            res.status(200).send();
        } catch (err) {
            res.status(400).send({
                message: ' Pri brisanju kompanije ' + err.toString()
            });
        }
    }
};
