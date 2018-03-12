const request = require('request');
const fs = require('fs');

module.exports = {

    async uploadImg(req,res) {

       // let file = req.files.image; // get img
        let link = null;

        console.log(req.files);

        var options = { 
          method: 'POST',
          url: 'https://api.imgur.com/3/image',
          headers: 
          { 'Cache-Control': 'no-cache',
            Authorization: 'Client-ID c54289b2ce81bf5',
            'Content-Type': 'application/x-www-form-urlencoded',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
          formData: 
          { image: 
              { value: fs.createReadStream("C:\\Users\\Imana\\Pictures\\proba.png"),//binary or base64
                options: 
                { filename: 'C:\\Users\\Imana\\Pictures\\proba.png',
                  contentType: null } } } };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
      
        console.log(body);
      }); 
    }
};
