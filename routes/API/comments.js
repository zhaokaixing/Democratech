/**
 * Created by lelib on 06/04/2017.
 */
let express = require('express');
let router = express.Router();

let mongojs = require('mongojs');

var MongoClient = require('mongodb').MongoClient,
    test = require('assert');

router.get('/comments', function(req, res, next) {
    console.log("/comments");
});

router.get('/comments/:id', function(req, res, next) {
    MongoClient.connect('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', function (err, db2) {
        var collection = db2.collection('comments');
        collection.find({'idProject':req.params.id}).toArray(function(err, docs){
            if(err){
                console.log(err.message);
                res.send(err);
            }
            res.json(docs);
            db2.close();
        });
    });
});


router.post('/comments', (req, res, next) => {

    var comment = req.body;
    MongoClient.connect('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', function (err, db2) {
        var collection = db2.collection('comments');//mongojs.ObjectID.createFromHexString(req.params.id)
        collection.insert({
            "idProject": req.body.projectId,
            "name": req.body.author,
            "date": req.body.date,
            "content": req.body.message
        }
        , (err, stats) => {
            if (!err) {
                res.send("OK");
            }
        });
    });
});

module.exports = router