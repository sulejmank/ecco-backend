var JSZip = require('jszip');
var Docxtemplater = require('docxtemplater');
// var streamifier = require('streamifier');
const {Plan, Client, Ticket, Arrangement, PassangersInRoom, Room} = require('../models');
const moment = require('moment');

var fs = require('fs');
var path = require('path');
// var mime = require('mime');

module.exports = {
    async getBill (req, res) {
        var id = req.params.id;
        var content = fs.readFileSync(path.resolve(__dirname, '../templates/bill.docx'), 'binary');
        // var type = mime.lookup(path.resolve(__dirname, '../templates/bill.docx'));
        var zip = new JSZip(content);
        var plan = await Plan.findOne(
            { where: {id: id},
                include: [
                    Client,
                    Ticket,
                    {model: Arrangement,
                        include: [
                            {
                                model: Room,
                                include: [
                                    {
                                        model: PassangersInRoom,
                                        include: [
                                            Client
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
        var doc = new Docxtemplater();
        doc.loadZip(zip);
        doc.setData({
            putnik: plan.Client,
            arrangements: plan.Arrangements,
            flights: plan.Tickets,
            kreirano: moment(plan.createdAt, moment.ISO_8601).format('DD MMM YYYY'),
            rokUplate: moment(plan.rokUplate, moment.ISO_8601).format('DD MMM YYYY'),
            ukupno: plan.totalnaCena + '€',
            avans: plan.avans,
            organizator: 'John',
            licenca: 'Doe',
            posrednik: '0652455478',
            licenca2: 'New Website'
        });
        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render();
        } catch (error) {
            var e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties
            };
            console.log(JSON.stringify({error: e}));
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            res.status(500).send(e);
        }
        var buf = doc.getZip().generate({type: 'nodebuffer'});
        fs.writeFileSync(path.resolve(__dirname, '../templates/downloads/racun-001.docx'), buf);
        res.download(path.resolve(__dirname, '../templates/downloads/racun-001.docx'), 'racun-001.docx', () => {
            fs.unlink(path.resolve(__dirname, '../templates/downloads/racun-001.docx'), (err) => {
                if (err) {
                    console.log('failed to delete local image:' + err);
                } else {
                    console.log('successfully deleted local image');
                }
            });
        });
    },

    async getBillPreview (req, res) {
        var id = req.params.id;
        var content = fs.readFileSync(path.resolve(__dirname, '../templates/bill.docx'), 'binary');
        // var type = mime.lookup(path.resolve(__dirname, '../templates/bill.docx'));
        var zip = new JSZip(content);
        var plan = await Plan.findOne(
            { where: {id: id},
                include: [
                    Client,
                    Ticket,
                    {model: Arrangement,
                        include: [
                            {
                                model: Room,
                                include: [
                                    {
                                        model: PassangersInRoom,
                                        include: [
                                            Client
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            });
        var doc = new Docxtemplater();
        doc.loadZip(zip);
        doc.setData({
            putnik: plan.Client,
            arrangements: plan.Arrangements,
            flights: plan.Tickets,
            kreirano: moment(plan.createdAt, moment.ISO_8601).format('DD MMM YYYY'),
            rokUplate: moment(plan.rokUplate, moment.ISO_8601).format('DD MMM YYYY'),
            ukupno: plan.totalnaCena + '€',
            avans: plan.avans,
            organizator: 'John',
            licenca: 'Doe',
            posrednik: '0652455478',
            licenca2: 'New Website'
        });
        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render();
        } catch (error) {
            var e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties
            };
            console.log(JSON.stringify({error: e}));
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            res.status(500).send(e);
        }
        var buf = doc.getZip().generate({type: 'nodebuffer'});
        // var docName = req.session.user.id + '_' + id + '.docx';
        var docName = 1 + '_' + id + '.docx';
        fs.writeFileSync(path.resolve(__dirname, '../templates/downloads/' + docName), buf);

        res.status(200).send({docname: docName});
    },
    billRemove (req, res) {
        // console.log(req.params.id, req.session.user);
        // var documentName = req.session.user.id + '_' + req.params.id + '.docx';
        var documentName = 1 + '_' + req.params.id + '.docx';
        fs.unlink(path.resolve(__dirname, '../templates/downloads/' + documentName), (err) => {
            if (err) {
                res.status(500).send();
            } else {
                res.status(200).send();
            }
        });
    }
};
