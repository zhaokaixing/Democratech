/**
 * Created by quentinC on 04/03/2017.
 */
let express = require('express');
let router = express.Router();

let mongojs = require('mongojs');
let db = mongojs('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', ['departments']);

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
router.get('/city/:id', function(req, res, next){
    db.cities.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, cities){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

module.exports = router