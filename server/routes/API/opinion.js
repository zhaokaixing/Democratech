/**
 * Created by lelib on 06/04/2017.
 */
let express = require('express');
let router = express.Router();

let mongojs = require('mongojs');
let db = mongojs('mongodb://florent:adelaide@ds113580.mlab.com:13580/democratch', ['opinions']);

router.delete('/opinion/:id', (req, res) => {
    db.opinions.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, opinion) {
        if (err) res.send(err);
        res.json(opinion);
    })
});

router.get('/opinion/:projectId/:userId', (req, res) => {
    db.opinions.findOne({idProject: req.params.projectId, idUser: req.params.userId}, (err, opinion) => {
        if (err) res.send(err);
        res.json(opinion)
    })
});

router.post('/opinion', (req, res, next) => {
    var opinion = req.body;

    // check data integrity
    // if (form.isValidOrganisation(opinion)) {
        db.opinions.save(opinion, (err, opinion) => {
            if (err) res.send(err);
            res.json(opinion)
        })
    // }
    // else res.status(400).json({"error": "bad data"})
});
 
router.put('/opinion/:id', (req, res) => {
    let update = updateOpinion(req.body);
    if (!update) res.status(400).json({'error': 'bad data'});
    
    console.log(update);
    db.opinions.update({_id: mongojs.ObjectId(req.params.id)}, update, {}, (err, opinion) => {
        if (err) res.send(err);
        console.log(opinion);
        res.json(opinion);
    });
});

router.get('/opinion/count/:projectId/:vote', (req, res) => {
    db.opinions.find({idProject: req.params.projectId, opinion: parseInt(req.params.vote)}).count((err, count)=>{
        if(err) res.send(err);
        res.json(count);
    });
});

let updateOpinion = (opinion) => {
    var upOp = {}

    upOp.idUser = opinion.idUser;
    upOp.idProject = opinion.idProject;
    upOp.opinion = opinion.opinion;

    return (!upOp ? false : upOp);
}

module.exports = router