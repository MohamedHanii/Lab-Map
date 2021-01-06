
var express = require('express');
var router = express.Router();

let Technician = require("../models/technician");
const user = require('../models/user');
let User = require("../models/user")
router.get("/health", healthCheck)


async function healthCheck(req, res) {

    let user = await User.find({ isDentist: false });
    console.log(user)
    res.send(user)
}

router.post("/", getTechnicians)

async function getTechnicians(req, res) {
    // if(req.body.name.trim().length || req.body.price.trim().length || req.body.exp.trim().length){
    console.log(":::::::::::::::::::::::::::::::::")
    console.log(req.body)
    getTechnician(req.body.name, req.body.price, req.body.exp).then(result => res.render('search', { arr: result }))
    return
    // }
    // let techs = await User.find({isDentist: false});
    // console.log(techs)
    // // res.send(technicians)
    // res.render('search', { arr: techs });
}

async function getTechnician(name, price, exp, res) {
    let nameRegex = new RegExp(`.*${name}.*`, "i")
    // let nameRegex = new RegExp(`^${name}`,"i") //to check the start of the string only
    let users = await User.find({ $or: [{ firstName: nameRegex }, { lastName: nameRegex }, { city: nameRegex }, { neighbourhood: nameRegex }], isDentist: false })

    let technicians;
    if (price.length == 0 && exp.length == 0) {
        price = Number.MAX_VALUE;
        technicians = await Technician.find({});
    }
    if (price.length == 0 && exp.length != 0) {
        technicians = await Technician.find({ expYears: { $lte: exp } });
    }
    if (price.length != 0 && exp.length == 0) {
        technicians = await Technician.find({ price: { $lte: price } });
    }
    if (price.length != 0 && exp.length != 0) {
        technicians = await Technician.find({ $and: [{ price: { $lte: price } }, { expYears: { $lte: exp } }] });
    }

    //7an loop 3ala kol user 7anshof mawgod fe ay technician men aly 3andy wla la2 lw msh mawgod 7a eleimiate him men al users array
    //w 7anzwed alprice w al experience fe al user

    for (let i = 0; i < users.length; i++) {
        for (let j = 0; j < technicians.length; j++) {
            // console.log(technicians[j].userID);
            console.log(users[i].firstName);
            console.log(users[i].price + " , " + technicians[j].price);
            console.log(users[i].expYears + " , " + technicians[j].expYears);
            if (JSON.stringify(users[i]._id) === JSON.stringify(technicians[j].userID)) {
                users[i].price = technicians[j].price;
                users[i].expYears = technicians[j].expYears
                console.log(users[i].price);
                console.log(users[i].expYears);
            }
        }
        if (users[i].price == null) {
            users.splice(i, 1);
            i--;
            console.log("removed")
        }
    }
    // console.log(users);
    // console.log("==============")
    // console.log(technicians)
    return users
}

module.exports = router;