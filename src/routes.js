const addCustomerController = require('./controllers/addCustomerController');
const addCustomerRules = require('./validation/addCustomerRules');

module.exports = (app) => {
    app.post('/api/addCustomer', 
        addCustomerRules.addCustomer,
        addCustomerController.addCustomer);  
}