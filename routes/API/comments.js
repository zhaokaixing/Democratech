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
        var collection = db2.collection('comments');//mongojs.ObjectID.createFromHexString(req.params.id)
        collection.find({'idProject':'58d38e54f36d284fca6d08e5' }).toArray(function(err, docs){
            if(err){
                console.log(err.message);
                res.send(err);
            }
            res.json(docs);
            db2.close();
        });
    });
});


router.post('/comment', (req, res, next) => {

    /*var organisation = req.body;
    // check data integrity
    console.log(form.isValidOrganisation(organisation));

    if (form.isValidOrganisation(organisation)) {
        security.cryptPassword(organisation.password, (err, hash) => {
            if (err) res.send(err);
            organisation.password = hash;
            db.organisations.save(organisation, (err, organisation) => {
                if (err) res.send(err);
                res.json(organisation)
            })
        })
    }
    else res.status(400).json({"error": "bad data"})*/
});

module.exports = router