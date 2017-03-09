let express = require('express');
let router = express.Router();

let mongojs = require('mongojs');
let db = mongojs('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', ['departments']);

let security = require('../../tools/security');
let form = require('../../tools/form-validation');

router.get('/citizens', (req, res) => {
    db.citizens.find((err, citizens) => {
        if (err) res.send(err);
        res.json(citizens);
    })
});

router.get('/citizen/:id', (req, res) => {
    db.citizens.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, citizen) => {
        if (err) res.send(err);
        res.json(citizen)
    })
});

router.post('/citizen', (req, res) => {
    var citizen = req.body;
    // check data integrity
    console.log(form.isValidCitizen(citizen));

    if (form.isValidCitizen(citizen)) {
        security.cryptPassword(citizen.password, (err, hash) => {
            if (err) res.send(err);
            citizen.password = hash;
            db.citizens.save(citizen, (err, citizen) => {
                if (err) res.send(err);
                res.json(citizen)
            })
        })
    }
    else res.json({"error": "bad data"})
});

router.delete('/citizen/:id', (req, res) => {
    db.citizens.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, citizen) {
        if (err) res.send(err);
        res.json(citizen)
    })
});

router.put('/citizen/:id', (req, res) => {
    let update = updateCitizen(req.body);
    if (!update) res.status(400).json({'error': 'bad data'});

    db.citizens.update({_id: mongojs.ObjectId(req.params.id)}, update, {}, (err, citizen) => {
        if (err) res.send(err);
        res.json(citizen);
    });

})

let updateCitizen = (citizen) => {
    upCit = {}

    if (citizen.name) upCit.name = citizen.name;
    if (citizen.mail) upCit.mail = citizen.mail;
    if (citizen.password) upCit.password = citizen.password;
    if (citizen.description) upCit.description = citizen.description;

    return (!upCit ? false : upCit);
}

module.exports = router;