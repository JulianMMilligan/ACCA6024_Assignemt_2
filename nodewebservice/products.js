//setup DB Connection
const express = require('express');
const {Client, Connection} = require('pg');
const format = require('pg-format');


function GetClient()
{
	return new Client({
		host: "postgres",	// Service name in docker-compose
		port: 5432,
		user: "docker",
		password: "password",
		database: "sales"
	});	
}


//Get all products
SelectAll = async (res) => 
{
    let client = GetClient();
    console.log('Get all products');
    try{
        await client.connect();

        let query = 'SELECT product_id , product_name , product_cost , product_desc FROM "product" ';
        let results = await client.query(query);

        if (results.rows.length > 0)
            console.log(`Read ${results.rows.length} records`)
        else
            console.log('Database empty')

        
        res.send(results.rows);
    }
    catch(error)
    {
        console.log(error);
        res.status(403).send(error);

    }
    finally
    {
        await client.end();
    }
};


//Get products by category
SelectByCat = async (catID , res) => 
{
    let client = GetClient();
    console.log(`Get all products by category ${catID}`);
    try{
        await client.connect();

        let query = `SELECT product_id , product_name , product_cost , product_desc FROM "product" WHERE cat_id = ${catID}`;
        let results = await client.query(query);

        

        if (results.rows.length > 0)
            console.log(`Read ${results.rows.length} records`)
            
        else
            console.log('Database empty')

        
        res.send(results.rows);
    }
    catch(error)
    {
        console.log(error);
        res.status(403).send(error);

    }
    finally
    {
        await client.end();
    }
};





//Exports to be used as function
module.exports = {
    SelectAll,
    SelectByCat
};