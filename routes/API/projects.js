/**
 * Created by quentinC on 30/03/2017.
 */
let express = require('express');
let router = express.Router();

let mongojs = require('mongojs');


var MongoClient = require('mongodb').MongoClient,
    test = require('assert');

router.get('/projects', function(req, res, next) {
    MongoClient.connect('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', function (err, db2) {

        var collection = db2.collection('projects');

        collection.find().toArray(function (err, docs) {
            if(err){
                res.send(err);
            }
            res.json(docs);
            db2.close();
        });
    });
});

router.get('/project/:id', function(req, res, next) {
    MongoClient.connect('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', function (err, db2) {

        var collection = db2.collection('projects');

        collection.findOne({_id : mongojs.ObjectId(req.params.id)},function (err, doc) {
            if(err){
                res.send(err);
            }
            res.json(doc);
            db2.close();
        });
    });
});


router.get('/projects/:city', function(req, res, next) {
    MongoClient.connect('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', function (err, db2) {

        var collection = db2.collection('projects');
        collection.find({"address.city" : req.params.city}).toArray(function(err, docs){
            if(err){
                console.log(err.message);
                res.send(err);
            }
            res.json(docs);
            db2.close();
        });
    });
});


router.post('/project', (req, res) => {
    var project = req.body;
    MongoClient.connect('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', function (err, db2) {

        var collection = db2.collection('projects');

        collection.save(project,(err, project) => {
            if (err) res.send(err);
            res.json(project)
        })
    });
});



module.exports = router