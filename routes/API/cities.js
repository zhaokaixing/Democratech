/**
 * Created by quentinC on 04/03/2017.
 */
let express = require('express');
var router = express.Router();

let mongojs = require('mongojs');
var db = mongojs('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', ['cities']);

//get all cities
router.get('/cities', function(req, res, next){
    db.cities.find(function(err, cities){
        if(err){
            res.send(err);
        }
        res.json(cities);
    });
});

//get one city
router.get('/cities/:id', function(req, res, next){
    db.cities.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, cities){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

module.exports = router