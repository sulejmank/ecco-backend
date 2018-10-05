//const result = require('dotenv').config().parsed;
const https = require('https');
const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const {sequelize} = require('./models');
const cookieParser = require('cookie-parser');
const config = require('./config/config');
const helmet = require('helmet');
const favicon = require('serve-favicon');
const sessionStore = new session.MemoryStore({ reapInterval: 60000 * 10 });
// const SequelizeSessionStore = require('sequelize-session-store')(session);
const path = require('path');
const app = express();
const fs = require('fs');
// var key = require('./config/credentials.json');
// const googleService = require('./services/GoogleDriveService');
// var response = await googleService.initialize(key);
// const readline = require('readline');
// const {google} = require('googleapis');
// console.log(response)
//const prod = result.PRODUCTION;
const prod = 0;
if (parseInt(prod)) {
    var key = fs.readFileSync(result.PRIVATE_KEY);
    var cert = fs.readFileSync(result.FULL_CHAIN);
}
const options = {
    key: key,
    cert: cert
};

app.use(cookieParser());

app.use(favicon(path.join(__dirname, '', 'favicon.ico')));
var sessionOptions = {
    name: 'SID',
    store: sessionStore,
    key: 'SID',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: { path: '/', httpOnly: !parseInt(prod), secure: false, maxAge: null }
};

app.set('trust proxy', 1);
app.use(helmet());
app.use(morgan('dev'));
app.use((req, res, next) => {
    if (!req.originalUrl.includes('/temp/')) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Request-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Content-Security-Policy', "script-src 'self'");
    next();
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({// to support URL-encoded bodies
    extended: true
}));
app.use(session(sessionOptions));

app.use('/temp', express.static(path.join(__dirname, '/templates')));
require('./routes')(app);
sequelize.sync()
    .then(() => {
        if (parseInt(prod)) {
            https.createServer(options, app).listen(config.port);
            Object.values(sequelize.models).map(model => {
                return model.destroy({truncate: { cascade: true }});
            });
            require('./seeder.js');
        } else {
            Object.values(sequelize.models).map(model => {
                return model.destroy({truncate: { cascade: true }});
            });
            require('./seeder.js');
            app.listen(config.port);
        }
        console.log(`Server running on port ${config.port} `);
    }).catch(err => console.error(err));
