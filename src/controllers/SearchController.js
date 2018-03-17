const {Customer} = require('../models');
const axios = require('axios');

module.exports = {
    async searchCustomer(req, res) {
        try {
            let customers = null;
            let search = req.query.search; 

            if(search){
                customers = await Customer.findAll({
                    where: {
                        $or: [
                            'ime', 'prezime' 
                        ].map(key => ({
                            [key]: {
                                $like: `%${search}%`
                            }
                        }))
                    }
                })
            } else {
                customers = await Customer.findAll({ 
                    limit:20
                })
            }
            res.send(customers);   
        } catch(err){
            res.status(500).send({
                error: err.toString()                
            })
        }
    },

    async searchPlace(req, res) {
        try {
          let keyword = req.query.input;
          let respons = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyD26SxqE4hlzjbpJ99pFOdrSv62c_Bjgx8&input=' + encodeURI(keyword));

          res.send(respons.data.predictions);
        } catch (err) {
          res.status(500).send({
            error: err.toString()
          });
        }
    }
    
}