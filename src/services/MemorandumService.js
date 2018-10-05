var {
    Memorandum
} = require('../models');
// var path = require('path');
// var fs = require('fs');

module.exports = {
    async createMemorandum (memorandum) {
        try {
            let memorandumDB = await Memorandum.create({
                driveId: memorandum.id,
                name: memorandum.name
            });
            return memorandumDB;
        } catch (err) {
            return false;
        }
    },

    async getMemorandumById (id) {
        try {
            let memorandum = await Memorandum.findById(id);
            return memorandum;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
};
