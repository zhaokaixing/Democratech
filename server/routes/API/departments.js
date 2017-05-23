let express = require('express');
let router = express.Router();

let mongojs = require('mongojs');
let db = mongojs('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', ['departments']);

router.get('/departments', (rep, res) => {
    db.departments.find().sort({zip_code:1}).toArray((err, items) => {
        if (err) res.send(err);
        res.jsonp(items)
    })

});

module.exports = router;
