const ClientController = require('./controllers/ClientController');
const TicketController = require('./controllers/TicketController');
const SearchController = require('./controllers/SearchController');
const UploadController = require('./controllers/UploadController');
const PlanController = require('./controllers/PlanController');
const PurchaseController = require('./controllers/PurchaseController');
const InstallmentController = require('./controllers/InstallmentController');
const ArrangementController = require('./controllers/ArrangementController');
const RoomController = require('./controllers/RoomController');
const PaymentController = require('./controllers/PaymentController');
const PicklistController = require('./controllers/PicklistController');
const CompanyController = require('./controllers/CompanyController');
const HotelController = require('./controllers/HotelController');
const AgentController = require('./controllers/AgentController');
// const addClientRules = require('./validation/addClientRules');
const TransferController = require('./controllers/TransferController');
const TemplatingController = require('./controllers/TemplatingController');
const UserController = require('./controllers/UserController');
const DestinationController = require('./controllers/DestinationController');
const PassangerController = require('./controllers/PassangerController');
const FilesController = require('./controllers/FilesController');
const StatisticsController = require('./controllers/StatisticsController');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const type = upload.single('image');

module.exports = (app) => {
    // app.use((req, res, next) => {
    //     if (req.session.user === undefined) {
    //         if (req.originalUrl === '/api/login') {
    //             next();
    //         } else {
    //             res.status(401).send({
    //                 message: 'Not Authorised'
    //             });
    //         }
    //     } else {
    //         next();
    //     }
    // });

    app.post('/api/upload',
        type,
        UploadController.uploadImg);

    app.get('/api/bill/:id', TemplatingController.getBill);
    app.get('/api/billPreview/:id', TemplatingController.getBillPreview);
    app.post('/api/billRemove/:id', TemplatingController.billRemove);

    app.post('/api/addtransfer',
        TransferController.addTransfer);

    app.post('/api/login',
        UserController.login);
    app.post('/api/logout',
        UserController.logout);
    app.post('/api/user',
        UserController.addOrUpdateUser);
    app.delete('/api/user/:id',
        UserController.removeUser);

    app.get('/api/isLoggedin', UserController.isLoggedIn);
    app.get('/api/users', UserController.list);

    app.post('/api/purchase',
        PurchaseController.makePurchase);
    app.get('/api/purchases',
        PurchaseController.purchases);

    app.post('/api/payment/:id',
        PaymentController.makePayment);

    app.delete('/api/payment/:id',
        PaymentController.deletePayment);

    app.get('/api/payment/:id',
        PaymentController.getAllPayments);

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
    app.post('/api/client/:id',
        ClientController.delete);
    app.get('/api/client/:id',
        ClientController.getClientById);
    app.get('/api/list',
        ClientController.list);

    // Plan Routes
    app.post('/api/plan',
        PlanController.savePlan);
    app.get('/api/plans',
        PlanController.getAllPlans);
    app.put('/api/plan/:id',
        PlanController.updatePlan);
    app.get('/api/plan/:id',
        PlanController.getPlansById);
    app.get('/api/plan/:id/delete',
        PlanController.removePlansById);

    // Arrangement Routes
    app.post('/api/arrangement',
        ArrangementController.addArrangement);
    app.put('/api/arrangement/:id',
        ArrangementController.edit);
    app.post('/api/deleteArrangement',
        ArrangementController.delete);
    app.get('/api/arrangements',
        ArrangementController.list);

    // Ticket Routes
    app.post('/api/ticket',
        TicketController.addTicket);
    app.get('/api/tickets/:type',
        TicketController.list);
    app.get('/api/ticket/:id',
        TicketController.getTicket);
    app.post('/api/ticket/check',
        TicketController.checkTicket);
    app.post('/api/ticket/uncheck',
        TicketController.uncheckTicket);
    app.put('/api/ticket/:id',
        TicketController.edit);

    // Search Routes
    app.get('/api/relevant/client',
        SearchController.searchClient);
    app.get('/api/relevant/passanger',
        SearchController.searchPassanger);
    app.get('/api/relevant/company',
        SearchController.searchCompany);
    app.get('/api/relevant/hotel',
        SearchController.searchHotel);
    app.get('/api/relevant/agent',
        SearchController.searchAgent);
    app.get('/api/search',
        SearchController.searchPlace);

    // Room Routes
    app.post('/api/room',
        RoomController.addRoom);
    app.post('/api/room/arrangement/:id',
        RoomController.removeAllRoomsFromArrangement);

    // Destination Routes
    app.post('/api/destination',
        DestinationController.addDestination);

    // Passanger Routes
    app.post('/api/passanger',
        PassangerController.savePassanger);
    app.post('/api/passanger/room',
        PassangerController.savePassangerWithRoom);
    app.post('/api/passanger/tickets/:id',
        PassangerController.removeAllPassangersFromTicket);
    app.post('/api/passanger/:id/ticket/:ticketId',
        PassangerController.setClientAsPassanger);
    app.post('/api/passanger/arrangement',
        PassangerController.savePassangerOnArragement);
    app.post('/api/passanger/arrangement/:id',
        PassangerController.removeAllPassangersFromArrangement);
    app.post('/api/passanger/:id/arrangement/:arrangementId',
        PassangerController.setClientAsPassangerOnArrangement);

    // Passanger Routes
    app.get('/api/picklist',
        PicklistController.getPicklist);
    app.post('/api/picklist',
        PicklistController.addOrUpdatePicklist);
    app.delete('/api/picklist/:id',
        PicklistController.deletePicklist);

    // Destination Routes
    app.get('/api/destinations',
        DestinationController.list);

    // Company Routes
    app.post('/api/company',
        CompanyController.addCompany);
    app.get('/api/companies',
        CompanyController.getCompanies);
    app.delete('/api/company/:id',
        CompanyController.deleteCompany);

    // Hotel Routes
    app.post('/api/hotel',
        HotelController.addHotel);
    app.get('/api/hotels',
        HotelController.getHotels);
    app.delete('/api/hotel/:id',
        HotelController.deleteHotel);

    // Agent Routes
    app.post('/api/agent',
        AgentController.addAgent);
    app.get('/api/agents',
        AgentController.getAgents);
    app.delete('/api/agent/:id',
        AgentController.deleteAgent);

    app.post('/api/upload/:id',
        FilesController.uploadFile);
    app.get('/api/download/:id',
        FilesController.downloadFile);

    // Statistics Routes
    app.get('/api/statistics/customers',
        StatisticsController.customers);
    app.get('/api/statistics/destinations',
        StatisticsController.destinations);
};
