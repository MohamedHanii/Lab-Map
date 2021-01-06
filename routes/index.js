var express = require("express");
var router = express.Router();

var passport = require("passport");
const middlewareObj = require('../middleware');
var middleware = require("../middleware");

const user = require("../models/user");

var User = require("../models/user"),
  Dentist = require("../models/dentist"),
  Technician = require("../models/technician");

/* GET home page. */
router.get('/', middlewareObj.isLoggedIn, middlewareObj.isDoctor, function (req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET login page. */
router.get("/login", middlewareObj.LoggedIn, function (req, res, next) {
  res.render("login", { title: "Login" });
});

router.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function (req, res) {
    // if (failureRedirect) {
    //   req.flash("error", "Username or Password is Wrong");
    // }
    res.redirect("/profile/" + req.user._id);
  }
);

router.get("/logout", function (req, res) {
  req.logOut();
  // req.flash("success", "You Have Logged out!");
  res.redirect("/login");
});

/* GET registration page. */
router.get("/registration", middlewareObj.LoggedIn, function (req, res, next) {
  res.render("signup", { title: "Registration" });
});

router.post("/registration", function (req, res, next) {
  console.log(req.body);

  if (req.body.profession == "2") var isDentist = false;
  else var isDentist = true;
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
    isDentist: isDentist,
  });

  // encoding
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      // req.flash("error", err.message);
      return res.redirect("/registration");
    }

    if (isDentist) {
      var newDentist = new Dentist({
        position: req.body.position,
        medicalID: req.body.medicalID,
        userID: user._id,
      });
      Dentist.create(newDentist, function (err, newCreated) {
        if (err) console.log(err);
        console.log(newCreated);
      });
    } else {
      var newTechnician = new Technician({
        expYears: req.body.expYears,
        price: req.body.price,
        labID: req.body.labID,
        userID: user._id,
      });
      Technician.create(newTechnician, function (err, newCreated) {
        if (err) console.log(err);
        console.log(newCreated);
      });
    }

    res.redirect("/login");
  });
  console.log(newUser);
});

/* GET profile page. */
router.get("/profile/:id", middlewareObj.isLoggedIn, function (req, res, next) {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).render("error", { title: "error" });
      }

      user.currentUser = req.params.id == req.user._id;

      res.status(200).render("profile", { title: "profile", user });
      console.log(user);
    })
    .catch((err) => {
      res.status(500).render("error", { title: "error" });
    });
});

/* GET edit profile page. */
router.get("/edit_profile", middlewareObj.isLoggedIn, function (req, res, next) {
  if (!req.user._id) res.status(404).render("error", { title: "error" });
  User.findByIdAndUpdate(req.user._id)
    .then((user) => {
      if (!user) {
        res.status(404).render("error", { title: "error" });
      }

      user.currentUser = req.params.id == req.user._id;
      res.status(200).render("profile_edit", { title: "profile", user });
      console.log(user);
    })
    .catch((err) => {
      res.status(500).render("error", { title: "error" });
    });
});

/* GET edit profile page. */
router.post("/edit_profile", middlewareObj.isLoggedIn, function (req, res, next) {
  if (!req.user._id) res.status(404).render("error", { title: "error" });
  let user = {
    ...req.user._doc,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone1: req.body.phone1,
    phone2: req.body.phone2,
    city: req.body.city,
    neighbourhood: req.body.neighbourhood,
    streetAddress: req.body.streetAddress,
    graduatedFrom: req.body.graduatedFrom,
  };
  console.log(user);
  if (
    !user.firstName ||
    !user.lastName ||
    !user.email ||
    !user.phone1 ||
    !user.city ||
    !user.neighbourhood ||
    !user.streetAddress ||
    !user.graduatedFrom
  ) {
    res.status(400).send({
      message: "required fields cannot be empty",
    });
  }
  User.findByIdAndUpdate(user._id, user, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "no user found",
        });
      }
      res.status(200).redirect(`profile/${user._id}`);
      // res.status(200).render(`profile/${user._id}`, { title: "profile", user });
    })
    .catch((err) => {
      return res.status(404).send({
        message: "error while updating the user",
      });
    });
});

module.exports = router;
