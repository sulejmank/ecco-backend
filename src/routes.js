const ClientController = require('./controllers/ClientController');
const FlightTicketController = require('./controllers/FlightTicketController');
const SearchController = require('./controllers/SearchController');
const UploadController = require('./controllers/UploadController');
const PlanController = require('./controllers/PlanController');
const PurchaseController = require('./controllers/PurchaseController');
const InstallmentController = require('./controllers/InstallmentController');
const ArrangementController = require('./controllers/ArrangementController');
const addClientRules = require('./validation/addClientRules');
const addFlightTicketRules = require('./validation/addFlightTicketRules');
const TransferController = require('./controllers/TransferController');
const UserController = require('./controllers/UserController');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const type = upload.single('image');

module.exports = (app) => {
    app.post('/api/addClient',
        addClientRules.addClient,
        ClientController.addClient);

    app.post('/api/addAvio',
        FlightTicketController.addAvio);

    app.post('/api/addPlan',
        PlanController.addPlan);

    app.post('/api/updatePlan',
        PlanController.updatePlan);

    app.post('/api/upload',
        type,
        UploadController.uploadImg);

    app.post('/api/purchase',
        PurchaseController.makePurchase);

    app.post('/api/check',
        FlightTicketController.checkKarte);

    app.post('/api/login',
        UserController.login);

    app.post('/api/checkTicket',
        FlightTicketController.potvrdiKartu);

    app.post('/api/uplata',
        InstallmentController.platiRatu);

    app.post('/api/putnik',
        ClientController.putnik);

    app.post('/api/addAng',
        ArrangementController.addArrangement);

    app.post('/api/addAngWithPass',
        ArrangementController.createArranngementWithPassangers);

    app.post('/api/addtransfer',
        TransferController.addTransfer);

    app.post('/api/addtoang',
        ArrangementController.addPassToAng);

    app.post('/api/editclient',
        ClientController.edit);

    app.post('/api/removepass',
        ArrangementController.removePass);

    app.post('/api/deleteclient',
        ClientController.delete);

    app.post('/api/editArrangement',
        ArrangementController.edit);

    app.post('/api/deleteArrangement',
        ArrangementController.delete);

    app.get('/api/purchases',
        PurchaseController.purchases);

    app.get('/api/flight-tickets',
        FlightTicketController.list);

    app.get('/api/relevantClient',
        SearchController.searchClient);

    app.get('/api/rate',
        InstallmentController.list);

    app.get('/api/arrangements',
        ArrangementController.list);

    app.get('/api/list',
        ClientController.list);

    app.get('/api/search',
        SearchController.searchPlace);
};
