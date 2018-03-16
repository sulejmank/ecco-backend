const request = require('request');
const fs = require('fs');
const http = require("https");
const formData = require('form-data');
const Promise = require('bluebird');

module.exports = {

    async uploadImg(req,res) {

        let file = req.file; 
        var link = null;

      try {
        let slika = file.buffer.toString('base64');
        let forma = {
          'image': slika
        }

        request.post({url:'https://api.imgur.com/3/image', 
                        headers:{
                          'Authorization': 'Client-ID c54289b2ce81bf5'},
                        formData:forma },
                      (err, response, body) => {
                        if(err) {
                          console.log(err);
                        } else {
                          var obj = JSON.parse(body);
                          link = obj.data.link;

                          res.status(200).send({
                            urlSlike: obj.data.link
                          });
                        }
                      });     
        } catch(err){
            res.status(400).send({
              error:err
            });
        }
  }
};
