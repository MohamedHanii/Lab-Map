// all middleware 
var middlewareObj = {};

var Users = require("../models/user");
var Technician = require("../models/technician");
var Dentist = require("../models/dentist");

middlewareObj.checkProfileOwnerShip = function (req, res, next) {
    if (req.isAuthenticated()) {
        Users.findById(req.params.id, function (err, ownerUser) {
            if (err) {
                console.log(err);
                redirect("/");
            }
            if (ownerUser._id.equals(req.user._id)) {
                next();
            } else {
                // req.flash("error", "You don't have premission for that");
                res.redirect("back")
            }
        })


    } else {
        // req.flash("error","You Need to be Logged in to Access That")
        res.redirect("back");
    }
}



middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // req.flash("error","You Need to be Login First!");
    res.redirect("/login")

}
middlewareObj.isDoctor = function (req, res, next) {

    Users.findById(req.user._id, function (err, ownerUser) {
        console.log("===============");
        console.log(ownerUser);

        console.log("===============");
        if (err) {
            res.render("error");
        }
        if (ownerUser.isDentist) {
            return next();
        }
        // req.flash("error","You Need to be Login First!");
        res.redirect("/profile/" + ownerUser._id);
    })
}

middlewareObj.LoggedIn = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    // req.flash("error","You Need to be Login First!");
    res.redirect("back");


}

module.exports = middlewareObj;