let express = require('express');
var router = express.Router();

let mongojs = require('mongojs');
var db = mongojs('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', ['authorities']);

router.get('/authorities', (req, res) => {
    db.authorities.find(function(err, authorities) {
        if (err) res.send(err);

        res.json(authorities);
    })
})

router.get('/authority/:id', (req, res) => {
    db.authorities.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, authority) => {
        if (err) res.send(err);

        res.json(authority)
    })
})

router.post('/autority', (req, res, next) => { 
    var authority = req.body;
    // check data integrity
    console.log(authority);

})

module.exports = router;