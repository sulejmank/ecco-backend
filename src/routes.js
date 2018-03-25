const KlijentController = require('./controllers/KlijentController');
const AvioKartaController = require('./controllers/AvioKartaController');
const SearchController = require('./controllers/SearchController');
const UploadController = require('./controllers/UploadController');
const PlanController = require('./controllers/PlanController');
const PurchaseController = require('./controllers/PurchaseController');
const RataController = require('./controllers/RataController');
const AngazmanController = require('./controllers/AngazmanController');
const addKlijentRules = require('./validation/addKlijentRules');
const addAvioKartaRules = require('./validation/addAvioKartaRules');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const type = upload.single('image');

module.exports = (app) => {
    app.post('/api/addKlijent',
        addKlijentRules.addKlijent,
        KlijentController.addKlijent);

    app.post('/api/addAvio',
        addAvioKartaRules.addAvioKarta,
        AvioKartaController.addAvio);

    app.post('/api/addPlan',
        PlanController.addPlan);

    app.post('/api/upload',
        type,
        UploadController.uploadImg);

    app.post('/api/purchase',
        PurchaseController.makePurchase);

    app.post('/api/check',
        AvioKartaController.checkKarte);

    app.post('/api/uplata',
        RataController.platiRatu);

    app.post('/api/addAng',
        AngazmanController.addAngazman);

    app.post('/api/addtoang',
        AngazmanController.addPassToAng);

    app.get('/api/purchases',
        PurchaseController.purchases);

    app.get('/api/relevantKlijent',
        SearchController.searchKlijent);

    app.get('/api/rate',
        RataController.list);
    
    app.get('/api/angazmani',
        AngazmanController.list);

    app.get('/api/list',
        KlijentController.list);

    app.get('/api/search',
        SearchController.searchPlace);
};
