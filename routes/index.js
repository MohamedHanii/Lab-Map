var express = require('express');
var router = express.Router();


var passport = require("passport");
var middleware = require("../middleware");


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

router.post("/login", passport.authenticate("local", { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/profile/' + req.user._id);
  });


router.get("/logout", function (req, res) {
  req.logOut();
  // req.flash("success", "You Have Logged out!");
  res.redirect("/login");
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
  console.log(req.body);
  var newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    streetAddress: req.body.streetAddress,
    graduatedFrom: req.body.graduatedFrom,
    isDentist: isDentist
  });

  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.redirect("/registration");
    }

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

    res.redirect("/login");

  })
  console.log(newUser);
});


/* GET profile page. */
router.get("/profile/:id", function (req, res, next) {
  // get user using user id
  // if user id not found throw an error
  let user = {
    isDentist: true,
    firstName: "ahmed",
    lastName: "tarek",
    medicalId: "123456",
    email: "ahmedtarek@outlook.com",
    phone1: "010123456789",
    phone2: "010987654321",
    city: "alexandria",
    neighbourhood: "xyz",
    streetAddress: "abc",
    graduatedFrom: "collage",
    userName: "username",
    currentUser: true,
  };
  res.render("profile", { title: "profile", user });
});

/* GET edit profile page. */
router.get("/edit_profile", function (req, res, next) {
  // get authenicated user
  // if no user is logged in redirect
  let user = {
    id: "123",
    isDentist: true,
    firstName: "ahmed",
    lastName: "tarek",
    medicalId: "123456",
    email: "ahmedtarek@outlook.com",
    phone1: "010123456789",
    phone2: "010987654321",
    city: "alexandria",
    neighbourhood: "xyz",
    streetAddress: "abc",
    graduatedFrom: "collage",
    userName: "username",
    currentUser: true,
  };
  res.render("profile_edit", { title: "profile", user });
});

module.exports = router;
