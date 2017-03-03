let express = require('express');
var router = express.Router();

let mongojs = require('mongojs');
var db = mongojs('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', ['organisations']);

let security = require('../../tools/security');
let form = require('../../tools/form-validation');

router.get('/organisations', (req, res) => {
    db.organisations.find((err, organisations) => {
        if (err) res.send(err);
        res.json(organisations);
    })
})

router.get('/organisation/:id', (req, res) => {
    db.organisations.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, organisation) => {
        if (err) res.send(err);
        res.json(organisation)
    })
})

router.post('/organisation', (req, res, next) => { 
    var organisation = req.body;
    // check data integrity
    console.log(form.isValidOrganisation(organisation));

    if (form.isValidOrganisation(organisation)) {
        security.cryptPassword(organisation.password, (err, hash) => {
            if (err) res.send(err)
            organisation.password = hash
            db.organisations.save(organisation, (err, organisation) => {
                if (err) res.send(err)
                res.json(organisation)
            })
        })
    }
    else res.status(400).json({"error": "bad data"})
})

router.delete('/organisation/:id', (req, res) => {
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, organisation) {
        if (err) res.send(err)
        res.json(organisation)
    })
}) 

module.exports = router;