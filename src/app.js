const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const {sequelize} = require('./models');
const config = require('./config/config');
const helmet = require('helmet');
const app = express();
var sessionOptions = {
    key: 'session.sid',
    secret: 'topsecret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        maxAge: 600000
    }
};

app.use(cookieParser());
app.use(session(sessionOptions));

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Content-Security-Policy', "script-src 'self'");

    next();
});

app.use(bodyParser.json());

require('./routes')(app);

sequelize.sync()
    .then(() => {
        app.listen(config.port);
        console.log(`Server running on port ${config.port}`);
    })
    .catch(err => console.error(err));
