const ClientController = require('./controllers/ClientController');
const FlightTicketController = require('./controllers/FlightTicketController');
const SearchController = require('./controllers/SearchController');
const UploadController = require('./controllers/UploadController');
const PlanController = require('./controllers/PlanController');
const PurchaseController = require('./controllers/PurchaseController');
const InstallmentController = require('./controllers/InstallmentController');
const ArrangementController = require('./controllers/ArrangementController');
// const addClientRules = require('./validation/addClientRules');
// const addFlightTicketRules = require('./validation/addFlightTicketRules');
const TransferController = require('./controllers/TransferController');
const UserController = require('./controllers/UserController');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const type = upload.single('image');

module.exports = (app) => {
    app.use((req, res, next) => {
        // var user = req.session.user;
        console.log(req.session.user);
        if (req.originalUrl === '/api/login') {
            next();
        } else {
            res.status(400).send({
                error: req.originalUrl
            });
        }
    });

    app.post('/api/upload',
        type,
        UploadController.uploadImg);

    app.post('/api/addtransfer',
        TransferController.addTransfer);

    app.get('/api/login',
        UserController.login);

    app.post('/api/purchase',
        PurchaseController.makePurchase);
    app.get('/api/purchases',
        PurchaseController.purchases);

    // Installments Routes
    app.get('/api/rate',
        InstallmentController.list);
    app.post('/api/uplata',
        InstallmentController.platiRatu);

    // Clients Routes
    app.post('/api/addClient',
        // addClientRules.addClient,
        ClientController.addClient);
    app.post('/api/putnik',
        ClientController.putnik);
    app.post('/api/editclient',
        ClientController.edit);
    app.post('/api/deleteclient',
        ClientController.delete);
    app.get('/api/client/:id',
        ClientController.getClientById);
    app.get('/api/list',
        ClientController.list);

    // Plan Routes
    app.post('/api/addPlan',
        PlanController.addPlan);
    app.get('/api/plans',
        PlanController.getAllPlans);
    app.post('/api/updatePlan',
        PlanController.updatePlan);
    app.get('/api/plan/:id',
        PlanController.getPlansById);

    // Arrangement Routes
    app.post('/api/addAng',
        ArrangementController.addArrangement);
    app.post('/api/addAngWithPass',
        ArrangementController.createArranngementWithPassangers);
    app.post('/api/addtoang',
        ArrangementController.addPassToAng);
    app.post('/api/removepass',
        ArrangementController.removePass);
    app.post('/api/editArrangement',
        ArrangementController.edit);
    app.post('/api/deleteArrangement',
        ArrangementController.delete);
    app.get('/api/arrangements',
        ArrangementController.list);

    // Flight Ticket Routes
    app.post('/api/addAvio',
        FlightTicketController.addAvio);
    app.post('/api/check',
        FlightTicketController.checkKarte);
    app.get('/api/flight-tickets',
        FlightTicketController.list);
    app.post('/api/checkTicket',
        FlightTicketController.potvrdiKartu);

    // Search Routes
    app.get('/api/relevantClient',
        SearchController.searchClient);
    app.get('/api/search',
        SearchController.searchPlace);
};
