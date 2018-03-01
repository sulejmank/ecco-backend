const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./models');
const config = require('./config/config');


const app = express();

app.use(bodyParser.json());

require('./routes')(app);

sequelize.sync()
    .then(() => {
        app.listen(config.port);
        console.log(`Server running on port ${config.port}`);
    });
