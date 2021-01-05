var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Home" });
});

/* GET login page. */
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});

/* GET registration page. */
router.get("/registration", function (req, res, next) {
  res.render("signup", { title: "Registration" });
});

/* GET profile page. */
router.get("/profile/:id", function (req, res, next) {
  // get user using user id
  // if user id not found throw an error
  let user = {
    userType: "dentist",
    firstName: "ahmed",
    lastName: "tarek",
    medicalId: "123456",
    email: "ahmedtarek@outlook.com",
    phone1: "010123456789",
    phone2: "010987654321",
    city: "alexandria",
    neighbourhood: "xyz",
    address: "abc",
    graduatedFrom: "collage",
    userName: "username",
  };
  res.render("profile", { title: "profile", user });
});

module.exports = router;
