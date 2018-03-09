const CustomerController = require('./controllers/CustomerController');
const AvioKartaController = require('./controllers/AvioKartaController');
const SearchController = require('./controllers/SearchController');
const PlanController = require('./controllers/PlanController');
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
        
    app.get('/api/relevantCustomer',
        SearchController.searchCustomer); 
    
    app.get('/api/list',
        CustomerController.list);

    app.get('/api/search',
        SearchController.searchPlace);

}