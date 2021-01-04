var express = require('express');
var router = express.Router();

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

  var newUser = new User({

    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    streetAddress: req.body.streetAddress,
    graduatedFrom: req.body.graduatedFrom,
    isDentist: req.body.profession
  });

  console.log(newUser);

})

module.exports = router;
