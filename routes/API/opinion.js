/**
 * Created by lelib on 06/04/2017.
 */
let express = require('express');
let router = express.Router();

let mongojs = require('mongojs');

var MongoClient = require('mongodb').MongoClient,
    test = require('assert');


router.delete('/opinion/:projectId/:mail', (req, res) => {
    console.log("remove");
    MongoClient.connect('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', function (err, db2) {
        var collection = db2.collection('opinion');
        collection.remove({'idProject':req.params.projectId,'mail':req.params.mail},(err, docs)=>{
            if(err) {
                console.log(err.message);
                res.send(err);
            }
            db2.close();
        });
    });
});

router.get('/opinion/:projectId/:mail', (req, res) => {
    MongoClient.connect('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', function (err, db2) {
        var collection = db2.collection('opinion');
        collection.findOne({'idProject':req.params.projectId,'mail':req.params.mail},(err, docs)=>{
            if(err){
                console.log(err.message);
                res.send(err);
            }
            if(docs==null)
            {
                res.json(0);
            }

            else if(parseInt(docs.opinion)==0)
            {
                res.json(1);
            }
            else if(parseInt(docs.opinion)==1)
            {
                res.json(2);
            }
            db2.close();
        });
    });
});


router.post('/opinion', (req, res, next) => {
    MongoClient.connect('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', function (err, db2) {
    var collection = db2.collection('opinion');
    collection.findOne({'idProject':req.body.projectId,'mail':req.body.mail},(err, docs)=> {
        if (err) {
            console.log(err.message);
            res.send(err);
        }
        //console.log(docs.length);
        if (docs==null) {
            console.log("on insert");
            collection.insert({
                    "idProject": req.body.projectId,
                    "mail": req.body.mail,
                    "opinion": req.body.opinion
                }
                , (err, stats) => {
                    if (!err) {
                        res.send((req.body.opinion+1).toString());
                    }
                });

        }
        else {
            if(docs.opinion==req.body.opinion)
            {
                collection.remove({'idProject':req.body.projectId,'mail':req.body.mail}, function (err) {
                    if (err) {
                        throw err;
                    } else {
                        res.send("3");
                    }
                });
            }
            else
            {
                collection.update({'idProject':req.body.projectId,'mail':req.body.mail}, {
                    $set: {
                        'opinion': parseInt(req.body.opinion)
                    }
                }, function (err) {
                    if (err) {
                        throw err;
                    } else {
                        res.send((req.body.opinion+1).toString());
                    }
                });
            }

        }
    });
    });
});

module.exports = router