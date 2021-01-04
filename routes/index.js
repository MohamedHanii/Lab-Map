var express = require('express');
var router = express.Router();
var passport = require("passport");

var User = require("../models/user"),
  Dentist = require("../models/dentist"),
  Technician = require("../models/technician");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Home' });
});
``
/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

/* GET registration page. */
router.get('/registration', function (req, res, next) {
  res.render('signup', { title: 'Registration' });
});

router.post('/registration', function (req, res, next) {
  console.log(req.body);

  if (req.body.profession == '2')
    var isDentist = false;
  else
    var isDentist = true;

  var newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    passowrd: req.body.pass,
    email: req.body.email,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    streetAddress: req.body.streetAddress,
    graduatedFrom: req.body.graduatedFrom,
    isDentist: isDentist
  });

  User.register(newUser, req.body.pass, function (err, user) {
    if (err) {
      console.log(err);
      return res.redirect("/registration");
    }
    console.log("is it  above it ");
    if (isDentist) {
      var newDentist = new Dentist({
        position: req.body.position,
        medicalID: req.body.medicalID,
        userID: user._id
      });
      Dentist.create(newDentist, function (err, newCreated) {
        if (err)
          console.log(err);
        console.log(newCreated);
      });
    } else {
      var newTechnician = new Technician({
        expYears: req.body.expYears,
        price: req.body.price,
        labID: req.body.labID,
        userID: user._id
      });
      Technician.create(newTechnician, function (err, newCreated) {
        if (err)
          console.log(err);
        console.log(newCreated);
      });
    }
    res.redirect("/profile");
  })


  console.log(newUser);

})

module.exports = router;
