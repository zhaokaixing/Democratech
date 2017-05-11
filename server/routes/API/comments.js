/**
 * Created by lelib on 06/04/2017.
 */
let express = require('express');
let router = express.Router();

let mongojs = require('mongojs');
let db = mongojs('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', ['comments']);

router.get('/comments/:projectId', function(req, res, next) {
    db.comments.find({idProject: req.params.projectId}).sort({date:-1}).toArray(function(err, comments){
        if(err){
            console.log(err.message);
            res.send(err);
        }
        res.json(comments);
    });
});


router.post('/comment', (req, res, next) => {
    var comment = req.body;
    db.comments.save(comment, (err, comment) => {
        if (err) res.send(err);
        res.json(comment);
    });
});

router.delete('/comment/:id', (req, res) => {
    db.users.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, result) {
        if (err) res.send(err);
        res.json(result)
    })
});

module.exports = router