const { Payment, Plan } = require('../models');
// const {Sequelize} = require('../models');

// const Op = Sequelize.Op;

module.exports = {
    // async list (req, res) {
    //     let datum = new Date();
    //     let mesec = new Date();
    //     mesec.setMonth(datum.getMonth() + 1);

    //     const rate = await Installment.findAll({
    //         where: {
    //             [Op.or]: [{
    //                 datum: {
    //                     $between: [datum, mesec]
    //                 }
    //             }, {
    //                 [Op.and]: [
    //                     {status: false}, {
    //                         datum: {
    //                             lt: datum
    //                         }
    //                     }
    //                 ]
    //             }]
    //         },
    //         order: ['datum']
    //     })
    //         .then(() => {
    //             res.status(200).send(rate);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             res.status(400).send({
    //                 error: err
    //             });
    //         });
    // },

    async makePayment (req, res) {
        var id = parseInt(req.params.id);
        var body = req.body;
        var payment = await Payment.create({
            PlanId: id,
            payment: body.payment,
            paymentDate: body.paymentDate
        });
        try {
            var payments = await Payment.findAll({
                where: {
                    PlanId: id
                }
            });
        } catch (err) {
            res.status(500).send({message: err.toString()});
        }

        var plan = await Plan.findById(id);
        var totalPayments = payments.reduce((acc, el) => {
            acc += parseFloat(el.payment);
            return acc;
        }, 0);
        var total = plan.neto - plan.avans - totalPayments;
        if (!total) {
            plan.status = true;
            plan.save();
        }
        res.status(200).send(payment);
    },

    async getAllPayments (req, res) {
        var id = parseInt(req.params.id);
        var payments = await Payment.findAll({
            where: {
                PlanId: id
            }
        });

        res.status(200).send(payments);
    },

    async deletePayment (req, res) {
        var id = parseInt(req.params.id);
        try {
            let payment = await Payment.findOne({
                where: {
                    id: id
                }
            });
            let planId = payment.PlanId;
            await payment.destroy();
            try {
                var payments = await Payment.findAll({
                    where: {
                        PlanId: planId
                    }
                });
            } catch (err) {
                res.status(500).send({message: err.toString()});
            }

            var plan = await Plan.findById(planId);
            var totalPayments = payments.reduce((acc, el) => {
                acc += parseFloat(el.payment);
                return acc;
            }, 0);
            var total = plan.neto - plan.avans - totalPayments;
            if (total > 0) {
                plan.status = false;
                plan.save();
            }

            res.status(200).send({id: planId});
        } catch (err) {
            res.status(400).send(err);
            console.log(err);
        }
    }
};
