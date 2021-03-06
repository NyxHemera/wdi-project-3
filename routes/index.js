var express = require('express');
var router = express.Router();
var passport = require('passport');

/// I think I need the Story, but not the Prompt, so far
var Prompt = require('../models/prompt');
var Story = require('../models/story');



// GET Homepage
router.get('/', function(req, res, next) {
    function myObjectId(){
      var myCars = ["Opel", "Saab", "GMC", "Ford", "Honda", "Volvo", "BMW"];
      var max = myCars.length; 
      var min = 0;
      myRandomLocation(min,max);  

      function myRandomLocation(min,max) {
          myValue = Math.floor(Math.random() * (max - min)) + min;
          return myValue;
      };
      myPickedCar = myCars[myValue]; 
      // document.getElementById("demo1").innerHTML = myPickedCar;
      console.log("myPickedCar1", myPickedCar);
    };
    myObjectId();
    // console.log("myPickedCar2", myValue);
    var myTitle = "Welcome";
    myDisplayedCar = myPickedCar;
    res.render('index', { title: myTitle, myDisplayedData: myDisplayedCar, message: req.flash() }); // add the message
});



// GET /signup
router.get('/signup', function(req, res, next) {
    var myTitle = "Signup";
    res.render('signup.ejs', { title: myTitle, message: req.flash() });
});



// POST /signup
router.post('/signup', function(req, res, next) {
    var signUpStrategy = passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    });
    return signUpStrategy(req, res, next);
});

// GET /about
router.get('/about', function(req, res, next) {
    var myTitle = "About";
    res.render('about.ejs', {title: myTitle, message: req.flash() });
});


// GET /login
router.get('/login', function(req, res, next) {
    var myTitle = "Login";
    res.render('login.ejs', {title: myTitle, message: req.flash() });
});

// POST /login
router.post('/login', function(req, res, next) {
    var loginProperty = passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    });
    return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

// Restricted page
// router.get('/secret', function(req, res, next) {
//     if (currentUser) {
//         res.render('secret.ejs');
//     } else {
//         res.redirect('/');
//     }
// });



module.exports = router;
