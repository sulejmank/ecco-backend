const {Klijent} = require('../models');
const request = require('request');

module.exports = {
    async uploadImg (req, res) {
        let file = req.file;
        let link = null;
        let id = req.body.id;

        try {
            let slika = file.buffer.toString('base64');
            let forma = { 'image': slika };

            request.post({
                url: 'https://api.imgur.com/3/image',
                headers: {
                    'Authorization': 'Client-ID c54289b2ce81bf5'
                },
                formData: forma
            },

            async (err, response, body) => {
                if (err) {
                    throw new Error('image not uploaded!');
                } else {
                    var obj = JSON.parse(body);
                    link = await obj.data.link;

                    res.status(200).send({
                        urlSlike: link
                    });

                    await Klijent.update(
                        { urlSlike: link },
                        {
                            where: {id: id}
                        });
                }
            });
        } catch (err) {
            res.status(400).send({
                error: err
            });
        }
    }
};
