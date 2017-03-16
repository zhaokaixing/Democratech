/**
 * Created by quentinC on 04/03/2017.
 */
let express = require('express');
let router = express.Router();

let mongojs = require('mongojs');
let db = mongojs('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', ['cities']);




var MongoClient = require('mongodb').MongoClient,
    test = require('assert');

router.get('/cities', function(req, res, next) {
    MongoClient.connect('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', function (err, db2) {

        var collection = db2.collection('cities');

        collection.find().toArray(function (err, docs) {
            if(err){
                res.send(err);
            }
            res.json(docs);
            console.log(docs.length);
            db2.close();
        });
    });
});

/*
//get all cities
router.get('/cities', function(req, res, next){
    db.cities.find(function(err, cities){
        if(err){
            res.send(err);
        }
        res.json(cities);
    });
});

*/

var MongoClient = require('mongodb').MongoClient,
    test = require('assert');

router.get('/city/:id', function(req, res, next) {
    MongoClient.connect('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', function (err, db2) {

        var collection = db2.collection('cities');

        collection.findOne({_id : mongojs.ObjectId(req.params.id)},function (err, doc) {
            if(err){
                res.send(err);
            }
            res.json(doc);
            db2.close();
        });
    });
});
/*
//get one city
router.get('/city/:id', function(req, res, next){
    db.cities.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, city){
        if(err){
            res.send(err);
        }
        res.json(city);
    });
});*/

var MongoClient = require('mongodb').MongoClient,
    test = require('assert');

router.get('/cities/:dep', function(req, res, next) {
    MongoClient.connect('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', function (err, db2) {

        var collection = db2.collection('cities');
        collection.find({'department' : parseInt(req.params.dep.valueOf())}).toArray(function(err, docs){
            if(err){
                console.log(err.message);
                res.send(err);
            }
            res.json(docs);
            console.log("Fini");
            db2.close();
        });
    });
});
/*
//get all city with department number
router.get('/cities/:dep',function(req, res, next){
    db.cities.find({department : req.params.dep}, function(err, cities){
        console.log(req.params.dep);
        if(err){
            res.send(err);
        }
        res.json(cities);
    });
});*/


module.exports = router