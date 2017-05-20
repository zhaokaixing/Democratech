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

router.get('/user/:key/:value', (req, res) => {
  db.users.findOne({ [req.params.key]: req.params.value }, (err, user) => {
    if (err) res.send(err);
    res.json(user)
  })
});

router.post('/user', (req, res) => {
    var user = req.body;
    console.log(user)
    if (form.isValidUser(user)) {
        security.cryptPassword(user.password, (err, hash) => {
            if (err) res.send(err);
            else {
                user.password = hash;
                db.users.save(user, (err, user) => {
                    console.log(err)
                    console.log(user)
                    if (err) res.send(err);
                    else res.json(user)
                })
            }
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
    let user = req.body;
    if (!user) res.status(400).json({'error': 'bad data'});
    delete user._id;

    db.users.update({_id: mongojs.ObjectId(req.params.id)}, {$set: user}, {}, (err, update) => {
        if (err) res.send(err);
        res.json(update);
    });
})

router.put('/user/:id', (req, res) => {
    let user = req.body;
    if (!user) res.status(400).json({'error': 'bad data'});
    delete user._id;

    db.users.update({_id: mongojs.ObjectId(req.params.id)}, {$set: user}, {}, (err, update) => {
        if (err) res.send(err);
        res.json(update);
    });
})

module.exports = router;
