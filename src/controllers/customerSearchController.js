const {Customer} = require('../models');
const axios = require('axios');

module.exports = {
    // async searchCustomer(req, res) {
    //     try {

    //         let customers = null;
    //         const search = req.query.search; // 

    //         if(search){
    //             customers = await Customer.findAll({
    //                 where: {
    //                     $or: [
    //                         'ime', 'prezime' // za sad je u jednoj ruti, po potrebi podeliti na dve
    //                     ].map(key => ({
    //                          [key]: {
    //                              $like: `%${search}%`
    //                          }
    //                     }))
    //                 }
    //             })
    //         } else {
    //             customers = await Customer.findAll({ // u slucaju da mi posaljes empty string za pretragu, vracam poslednjih 20 redova
    //                 limit:20
    //             })
    //         }

    //         res.send(customers);

    //     } catch(err){
    //         res.status(500).send({
    //             error: err.toString()                
    //         })
    //     }
    // }

    async searchPlace(req, res) {
      try {
        var keyword = req.query.input;
        // var customers = await Customer.findAll({ // u slucaju da mi posaljes empty string za pretragu, vracam poslednjih 20 redova
        //   limit:20
        // })
        // res.send('respons');
        var respons = await axios.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyD26SxqE4hlzjbpJ99pFOdrSv62c_Bjgx8&input=' + encodeURI(keyword));
        // console.log(respons.data.predictions.reduce(function(el,acc) {return acc += el.description },""));
        res.send(respons.data.predictions);
      } catch (err) {
        res.status(500).send({
          error: err.toString()
        })
      }
    }
}