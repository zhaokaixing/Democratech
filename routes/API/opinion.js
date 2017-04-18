/**
 * Created by lelib on 06/04/2017.
 */
let express = require('express');
let router = express.Router();

let mongojs = require('mongojs');
let db = mongojs('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', ['departments']);

let security = require('../../tools/security');
let form = require('../../tools/form-validation');

router.get('/opinion/:idProject', (req, res) => {
    /*db.organisations.find((err, organisations) => {
        if (err) res.send(err);
        res.json(organisations);
    })*/
});

router.get('/opinion/:idProject:idUser', (req, res) => {
    /*db.organisations.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, organisation) => {
        if (err) res.send(err);
        res.json(organisation)
    })*/
});


router.post('/organisation', (req, res, next) => {
    var organisation = req.body;
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
    else res.status(400).json({"error": "bad data"})
});