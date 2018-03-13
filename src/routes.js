const CustomerController = require('./controllers/CustomerController');
const AvioKartaController = require('./controllers/AvioKartaController');
const SearchController = require('./controllers/SearchController');
const UploadController = require('./controllers/UploadController');
const PlanController = require('./controllers/PlanController');
const PurchaseController = require('./controllers/PurchaseController');
const RataController = require('./controllers/RataController');
const addCustomerRules = require('./validation/addCustomerRules');
const addAvioKartaRules = require('./validation/addAvioKartaRules');


module.exports = (app) => {

    app.post('/api/addCustomer', 
        addCustomerRules.addCustomer,
        CustomerController.addCustomer);  

    app.post('/api/addAvio',
        addAvioKartaRules.addAvioKarta,
        AvioKartaController.addAvio);

    app.post('/api/addPlan',
        PlanController.addPlan);

    app.post('/api/upload',
        UploadController.uploadImg);

    app.post('/api/purchase',
        PurchaseController.makePurchase);
    
    app.post('/api/check', 
        AvioKartaController.potvrdiKartu);

    app.post('/api/uplata', 
        RataController.platiRatu);
        
    app.get('/api/relevantCustomer',
        SearchController.searchCustomer); 

    app.get('/api/rate', 
        RataController.list)
    
    app.get('/api/list',
        CustomerController.list);

    app.get('/api/search',
        SearchController.searchPlace);

}