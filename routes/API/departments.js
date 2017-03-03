let express = require('express');
var router = express.Router();

let mongojs = require('mongojs');
var db = mongojs('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', ['departments']);

let security = require('../../tools/security');
let form = require('../../tools/form-validation');

router.get('/departments', (rep, res) => {
    db.departments.find((err, departments) => {
        if (err) res.send(err) 
        res.json(departments)
    })
})

module.exports = router