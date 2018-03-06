const addCustomerController = require('./controllers/addCustomerController');
const addCustomerRules = require('./validation/addCustomerRules');
const customerSearchController = require('./controllers/customerSearchController');

module.exports = (app) => {
    app.post('/api/addCustomer', // 
        addCustomerRules.addCustomer,
        addCustomerController.addCustomer);  

    // app.get('/api/relevantCustomer',
    //     customerSearchController.searchCustomer);  // get za autocomplete

    app.get('/api/search',
        customerSearchController.searchPlace); 
}