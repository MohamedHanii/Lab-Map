var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var TechnicianSchema = new mongoose.Schema({

    expYears: Number,
    labID: Number,
    price: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

});



module.exports = mongoose.model("Technician", TechnicianSchema);