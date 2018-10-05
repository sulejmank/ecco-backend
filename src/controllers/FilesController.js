const googleService = require('../services/GoogleDriveService');
const arrangementService = require('../services/ArrangementService');
const templateService = require('../services/TemplateService');
const memorandumService = require('../services/MemorandumService');
var mime = require('mime');
const fs = require('fs');
const key = require('../config/credentials.json');
const folder = '1SOJg4S5igVYax3DEdH3T-A2p0Yl1rG1p';

module.exports = {
    async uploadFile (req, res) {
        var {success, drive, token} = await googleService.initialize(key);
        if (success) {
            var plan = await arrangementService.getPlanById(req.params.id);
            var {path, file} = await templateService.generateMemorandum(plan);
            if (path !== undefined) {
                var fileMetadata = {
                    'name': file,
                    parents: [folder]
                };
                var media = {
                    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    body: fs.createReadStream(path)
                };
                var response = new Promise((resolve, reject) => {
                    drive.files.create({
                        auth: token,
                        resource: fileMetadata,
                        media: media,
                        fields: 'id, name'
                    }, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    });
                });
                let memorandumDrive = await response;
                let memorandum = await memorandumService.createMemorandum(memorandumDrive.data);
                await arrangementService.updateArrangementMemorandum(plan.Arrangements[0].id, memorandum.id);
                res.status(200).send();
            } else {
                res.status(500).send({message: 'Unable to compile templates'});
            }
        } else {
            res.status(500).send({message: ' Error occured while authorization with Google Drive'});
        }
    },

    async downloadFile (req, res) {
        var id = req.params.id;
        var memorandum = await memorandumService.getMemorandumById(id);
        var {success, drive, token} = await googleService.initialize(key);
        var dest = fs.createWriteStream(`src/templates/${memorandum.name}`);

        if (success) {
            var downloadFromApi = new Promise((resolve, reject) => {
                drive.files.get({
                    auth: token,
                    fileId: memorandum.driveId,
                    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                    alt: 'media'
                }, {
                    responseType: 'stream'
                }, function (err, response) {
                    if (err) return reject(err);
                    response.data.on('error', err => {
                        reject(err);
                    }).on('end', () => {
                        resolve(true);
                    }).pipe(dest);
                });
            });
            var isSuccess = await downloadFromApi;

            if (isSuccess) {
                var mimetype = mime.lookup(`src/templates/${memorandum.name}`);
                res.setHeader('Content-disposition', `attachment; filename=${memorandum.name}`);
                res.setHeader('Content-type', mimetype);

                var filestream = fs.createReadStream(`src/templates/${memorandum.name}`);
                var stream = filestream.pipe(res);
                stream.on('finish', () => {
                    fs.unlink(`src/templates/${memorandum.name}`, () => { console.log('File Deleted'); });
                }, () => { console.log('File Deleted'); });
                // res.status(200).download(`src/templates/${memorandum.name}`, memorandum.name);
            } else {
                res.status(500).send({message: 'Download Failed'});
            }
        } else {
            res.status(500).send({message: 'Download Failed'});
        }
    }
};
