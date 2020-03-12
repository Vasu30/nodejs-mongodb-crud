const express = require('express');
const router = express.Router();
const Club = require('../models/Club');



// ROUTE FOR READ
router.get('/', (req, res) => {
    Club.find((err, docs) => {
        if (err) throw err;
        // console.log(docs);
        res.render('home', {
            teams: docs
        })
    }).catch(err => {
        console.log(err);
    })
});


// ROUTE FOR CREATE
router.post('/add', (req, res, next) => {
    const {
        name,
        players,
        coach
    } = req.body;
    // console.log(name, players, coach);
    const club = new Club({
        name,
        players,
        coach
    });
    club.save(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('viewall');
        }
    });

});

//  Route for View All

router.get('/viewall', (req, res, next) => {
    // console.log('viewAll');
    Club.find((err, docs) => {
        if (err) throw err;
        //  console.log(docs);
        res.render('list', {
            team: docs
        })
    }).catch(err => {
        console.log(err);
    })
});



// ROUTE TO SHOW UPDATE ELEMENT
router.get('/edit/:id', (req, res, next) => {
    // console.log(req.params.id);
    // res.send(req.params.id);
    Club.findOneAndUpdate({_id: req.params.id},req.body, { new: true }, (err, docs)=>{
        console.log(docs);
        
        // console.log(docs._id);
        
        res.render('edit', {team:docs});
    })
});




// ROUTE TO UPDATE ELEMENT
router.post('/edit/:id', (req, res, next) => {
    Club.findByIdAndUpdate({_id: req.params.id},req.body, (err)=>{
        if (err) {
            console.log(err);
            next(err);
        } else {
            res.redirect('/');
        }
    })
    
});


// ROUTE TO DELETE ELEMENT
router.get('/viewall/:id',(req, res)=>{
    Club.findByIdAndDelete({_id:req.params.id}, err=>{
        if(err){
            console.log(err);
            
        }else{
            res.redirect('/');
        }
    });
})




module.exports = router;