//setup webservice 
const express = require ('express');
const cors = require("cors");
const { param } = require("express-validator");
const { parseComplete } = require("pg-protocol/dist/messages");
const service = express();
const port = 1339;
const products = require('./products');
const { types } = require('pg');

service.listen(port , () => console.log(`Webservice is up and listening at http://localhost:${port}`));
service.use(cors()); // to enable cors support 

//testing
service.get('/testservice' , (req , res) => {
    res.send(`The service is up and listening at http://localhost:${port}`);
});

//DB code

service.get('/products' , async (req , res) => {

    await products.SelectAll(res);
        
})

service.get('/products/:id' , async (req , res ) => {

    await products.SelectByCat(parseInt(req.params.id) , res);
})