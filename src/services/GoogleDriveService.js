var {
    google
} = require('googleapis');
// var path = require('path');
// var fs = require('fs');

module.exports = {
    initialize (key) {
        var drive = google.drive('v3');

        var jwToken = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key, ['https://www.googleapis.com/auth/drive'],
            null
        );
        return new Promise((resolve, reject) => {
            jwToken.authorize((authErr) => {
                if (authErr) {
                    reject(authErr);
                } else {
                    resolve({success: true, drive: drive, token: jwToken});
                }
            });
        });
    }
};
