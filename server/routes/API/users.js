let express = require('express');
let router = express.Router();

let mongojs = require('mongojs');
let db = mongojs('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', ['users']);

let security = require('../../tools/security');
let form = require('../../tools/form-validation');

router.get('/users', (req, res) => {
    db.users.find((err, users) => {
        if (err) res.send(err);
        res.json(users);
    })
});

router.get('/user/:id', (req, res) => {
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, user) => {
        if (err) res.send(err);
        res.json(user)
    })
});

router.get('/user/:email', (req, res) => {
    db.users.findOne({ mail: req.params.email }, (err, user) => {
        if (err) res.send(err);
        res.json(user)
    })
});

router.post('/user', (req, res) => {
    var user = req.body;
    // check data integrity
    console.log(form.isValidUser(user));

    if (form.isValidUser(user)) {
        security.cryptPassword(user.password, (err, hash) => {
            if (err) res.send(err);
            user.password = hash;
            db.users.save(user, (err, user) => {
                if (err) res.send(err);
                res.json(user)
            })
        })
    }
    else res.json({"error": "bad data"})
});

router.delete('/user/:id', (req, res) => {
    db.users.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, user) {
        if (err) res.send(err);
        res.json(user)
    })
});

router.put('/user/:id', (req, res) => {
    let update = updateUser(req.body);
    if (!update) res.status(400).json({'error': 'bad data'});

    db.users.update({_id: mongojs.ObjectId(req.params.id)}, update, {}, (err, user) => {
        if (err) res.send(err);
        res.json(user);
    });

})

let updateUser = (user) => {
    upCit = {}

    if (user.name) upCit.name = user.name;
    if (user.mail) upCit.mail = user.mail;
    if (user.password) upCit.password = user.password;
    if (user.description) upCit.description = user.description;

    return (!upCit ? false : upCit);
}

module.exports = router;