var express = require('express')
var router = express.Router()
var mysql = require('mysql');
var connection = mysql.createConnection({
	host     : 'localhost',
	port : '3306',
	user     : 'root',
	password : '',
	database: 'ccdb'
  });

var City = require('../models/City')

router.get('/', getAllCities);
router.post('/', createNewCity);
router.put('/:id', editCity);
router.delete('/:id', deleteCity);

module.exports = router;

/// Functions
// function getAllCities(){
// 	connection.connect(function(err) {
// 		if (err) {
// 		  console.error('error connecting: ' + err.stack);
// 		  return;
// 		}	   
// 		console.log('connected to sql server' );	  
// 		connection.query("select * from cities", function(err, res, fields){
// 		  if (!err) console.log(res[0].cityname);
// 		  //console.log(fields);
// 		} );	  
// 	  });
// }
async function getAllCities(req, res) {
	try {
     await connection.query("SELECT * FROM cities", function(er, response){
        if (!er) 
        res.status(200).send(response)        
      });	  
	} catch (error) {
		console.log(error)    
		res.sendStatus(500) 
	}  
}

async function createNewCity(req, res){
  console.log('creation request')
  let sql = "INSERT INTO cities (cityName) VALUES('"+req.body.cityName+"')"
  console.log(sql)
  try {
    await connection.query(sql, function(er, result){
        if (!er) 
        console.log(result)
        res.status(201).send(result)
      });	  
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}

async function editCity(req, res){
  let sql = "UPDATE cities SET cityName = '"+req.body.cityName+"' WHERE ID = '"+req.params.id+"'" 
  try {
    await connection.query(sql, function(er, result){
        if (!er) 
        console.log(result)
        return res.status(200).send({result});
      });	  
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}

async function deleteCity(req, res){ 
  let sql = "DELETE FROM cities WHERE ID = '"+req.params.id+"'" 
  try {
    await connection.query(sql, function(er, result){
        if (!er) 
        console.log(result)
        return res.status(204).send(result);
      });	  
  } catch (error) {
    console.log(error)    
    res.sendStatus(500) 
  }  
}

// async function getAllCities(req, res) {
// 	try {
// 		let cities = await City.find({}, '-__v') 
// 		res.status(200).send(cities)
// 	} catch (error) {
// 		console.log(error)    
// 		res.sendStatus(500)
// 	}  
// }

// async function createNewCity(req, res) {
// 	let newCity = req.body
// 	let city = new City(newCity)
// 	await city.save((err, result) => {
// 		if(err){
// 			console.log(err)
// 			return res.status(500).send(err);      
// 		}
// 		console.log(result)
// 		res.status(201).send({id: result._id, cityName: result.cityName})
// 	})  
// }

// async function editCity(req, res) {
// 	await City.findByIdAndUpdate(      
// 		req.params.id,
// 		req.body,    
// 		{new: true},
// 		(err, result) => {
// 			if (err) return res.status(500).send(err);
// 			return res.status(200).send({id: result._id, cityName: result.cityName});
// 		}
// 	)
// }

// async function deleteCity(req, res) {
// 	await City.findByIdAndRemove(req.params.id, (err, result) => {  
// 		if (err) {
// 			console.log(err)
// 			return res.status(500).send(err);
// 		}
// 		const response = {
// 			message: "City successfully deleted"
// 		};
// 		console.log("City deleted")
// 		return res.status(204).send(response);
// 	});
// }
  