var express = require('express');
var router = express.Router();
var authenticate = require('./authenticate');
var User = require('../models/user');


// INDEX
router.get('/index', authenticate, function(req, res, next) {
    var myuser = global.currentUser.user;
    var myTitle = "Users Home";
    res.render('users/index', { title: myTitle, users: myuser, message: req.flash() });
});


// SHOW
router.get('/:id', authenticate, function(req, res, next) {
    var myTitle = "User Show";
    // var user = global.currentUser.users.id(req.params.id);
    // if (!user) return next(makeError(res, 'Document Woot not found', 404));
    // res.render('users/show', { user: user, message: req.flash() });
    User.find({ user: global.currentUser })
        .then(function(users) {
            res.render('users/show', { title: myTitle, users: users, message: req.flash() });
        });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
    var user = currentUser.users.id(req.params.id);
    var myTitle = "User Edit";
    if (!user) return next(makeError(res, 'Document not found', 404));
    res.render('user/edit', {title: myTitle, user: user, message: req.flash() });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
    var user = currentUser.users.id(req.params.id);
    if (!user) return next(makeError(res, 'Document not found', 404));
    else {
        user.userTheme = req.body.userTheme;
        currentUser.save()
            .then(function(saved) {
                res.redirect('/users');
            }, function(err) {
                return next(err);
            });
    }
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
    var user = currentUser.users.id(req.params.id);
    if (!user) return next(makeError(res, 'Document not found', 404));
    var index = currentUser.users.indexOf(user);
    currentUser.users.splice(index, 1);
    currentUser.save()
        .then(function(saved) {
            res.redirect('/users');
        }, function(err) {
            return next(err);
        });
});

module.exports = router;
