const express = require('express');
const server = express();
const router = express.Router();
const path = require('path');
const port = 1449;
const Axios = require('axios');
let dirname = __dirname;
server.use(express.json());

server.use(express.urlencoded({ extended: true }));

server.use (express.static( path.join(dirname,'/public'), {
    //index@ 'home.html' // if you wanted to use a different page.
    extensions:['html' , 'htm']
}));

server.set ('view engine' , 'ejs');
server.set ('views' , path.join(dirname, '/views'));


server.listen(port , () => console.log(`The Gibson is online on port - ${port} , using dir : ${dirname}`));

//routing
server.get ('/shop' , (reg , res ) => {
    console.log('Request for shop page');
    res.render('shop');
});


server.get('/webServerTest' , (req , res) => {
    console.log("Webserver test");
    res.send(`The Gibson is online on port - ${port} , using dir : ${dirname}`);

})

server.get('/readProducts' , async (req , res) => {
    try{
        
        let containerName = "webservice";
        let response = await Axios.get(`http://${containerName}:1339/products`);
        res.render('shop2' , {products: response.data});
    }
    catch(error)
    {
        console.log(error);
        res.status(403).send({});
    }
});