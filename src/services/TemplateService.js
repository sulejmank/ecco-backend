const JSZip = require('jszip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
// const templatePath =
module.exports = {
    async generateMemorandum (plan) {
        var createdDate = moment(plan.createdAt, moment.ISO_8601).format('DD MMM YYYY').toString();
        var content = fs.readFileSync(path.resolve(__dirname, '../templates/memorandum.docx'), 'binary');
        // var type = mime.lookup(path.resolve(__dirname, '../templates/bill.docx'));
        var zip = new JSZip(content);
        var doc = new Docxtemplater();
        doc.loadZip(zip);
        doc.setData({
            musterija: plan.Client,
            destinacija: plan.Arrangements[0].Destination.destinacija,
            tipAranzmana: plan.Arrangements[0].Type.title,
            hotel: plan.Arrangements[0].Hotel.name,
            kreirano: createdDate,
            datumPocetka: moment(plan.Arrangements[0].datumPocetka, moment.ISO_8601).format('DD.MM.YYYY'),
            brojNoci: plan.Arrangements[0].brojDana + ' noci',
            ukupno: plan.neto + '€',
            avans: plan.avans,
            putnici: plan.Arrangements[0].PassangersArrangements.map(r => {
                return r.ClientPassangerId == null ? r.Passanger : r.ClientPassanger;
            })
        });
        try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render();
        } catch (error) {
            console.log(JSON.stringify(error));
            return false;
        }
        var buf = doc.getZip().generate({type: 'nodebuffer'});
        var fileName = `memorandum-${plan.id}-${createdDate}.docx`.split(' ').join('_');
        var pathName = path.resolve(__dirname, `../templates/downloads/${fileName}`);
        fs.writeFileSync(pathName, buf);
        return {path: pathName, file: fileName};
    },

    generateDocument (content) {
        var zip = new JSZip(content);
        // let generated = await zip.loadAsync();
        var doc = new Docxtemplater();
        doc.loadZip(zip);
        var buf = doc.getZip().generate({type: 'nodebuffer'});
        var pathName = path.resolve(__dirname, `../templates/downloads/unique.docx`);
        fs.writeFileSync(pathName, buf);
        return pathName;
    }
};
