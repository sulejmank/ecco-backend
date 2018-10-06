const {
    Arrangement,
    PassangersArrangement,
    Client,
    Picklist,
    Plan,
    Hotel,
    Agent,
    Passanger,
    Destination
} = require('../models');

module.exports = {
    async getPlanById (id) {
        try {
            var plan = await Plan.findOne(
                { where: {id: id},
                    include: [
                        {
                            model: Arrangement,
                            include: [
                                Hotel,
                                Agent,
                                {
                                    model: Picklist,
                                    as: 'Type'
                                },
                                {
                                    model: Picklist,
                                    as: 'Service'
                                },
                                {
                                    model: Destination,
                                    as: 'Destination'
                                },
                                {
                                    model: Destination,
                                    as: 'Depart'
                                },
                                {
                                    model: PassangersArrangement,
                                    include: [
                                        Passanger,
                                        {
                                            model: Client,
                                            as: 'ClientPassanger'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                });
            return plan;
        } catch (error) {
            return error;
        }
    },

    async updateArrangementMemorandum (id, memorandumId) {
        try {
            await Arrangement.update({
                MemorandumId: memorandumId
            }, { where: {id: id} });
        } catch (err) {
            return false;
        }
    }
};
