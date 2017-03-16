/**
 * Created by quentinC on 04/03/2017.
 */
let express = require('express');
let router = express.Router();

let mongojs = require('mongojs');
let db = mongojs('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', ['cities']);



//get all cities
router.get('/cities', function(req, res, next){
    db.cities.find(function(err, cities){
        if(err){
            res.send(err);
        }
        res.json(cities);
    });
});

var MongoClient = require("mongodb").MongoClient;
MongoClient.connect("mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch", function(error, db) {
    if (error) return funcCallback(error);
    db.collection("cities").find().toArray(function (error, results) {
        if (error) throw error;

        results.forEach(function(i, obj) {
            console.log(
                "ID : "  + obj._id.toString() + "\n");
        });
    });
});
//get one city
router.get('/city/:id', function(req, res, next){
    db.cities.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, city){
        if(err){
            res.send(err);
        }
        res.json(city);
    });
});

//get all city with department number
router.get('/cities/:dep',function(req, res, next){
    db.cities.find({department : req.params.dep}, function(err, cities){
        console.log(req.params.dep);
        if(err){
            res.send(err);
        }
        res.json(cities);
    });
});


module.exports = router