var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    email: String,
    phone1: String,
    phone2: String,
    city: String,
    neighbourhood: String,
    streetAddress: String,
    graduatedFrom: String,
    isDentist: { type: Boolean, default: true }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);