var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var DentistSchema = new mongoose.Schema({

    position: String,
    medicalID: Number,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

});



module.exports = mongoose.model("Dentist", DentistSchema);