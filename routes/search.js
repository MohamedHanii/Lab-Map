
var express = require('express');
var router = express.Router();

let Technician = require("../models/technician");
let User = require("../models/user")
router.get("/health", healthCheck)


async function healthCheck(req,res){

    let user = await User.find({isDentist: false});
    console.log(user)
    res.send(user)
}

router.post("/",getTechnicians)

async function getTechnicians(req,res){
    if(req.body.name.trim().length || req.body.price.trim().length || req.body.exp.trim().length){
        console.log(req.body.name)
        getTechnician(req.body.name, req.body.price, req.body.exp).then(result => res.render('search', { arr: result }))
        return
    }
    let techs = await User.find({isDentist: false});
    console.log(techs)
    // res.send(technicians)
    res.render('search', { arr: techs });
}

async function getTechnician(name, price, exp, res){
    let nameRegex = new RegExp(`.*${name}.*`,"i")
    // let nameRegex = new RegExp(`^${name}`,"i") //to check the start of the string only
    let users = await User.find({ $or: [{firstName: nameRegex} , {lastName: nameRegex}, {city: nameRegex}, {neighbourhood: nameRegex}], isDentist: false})

    if(price.length == 0){
        price = Number.MAX_VALUE;
    }
    if(exp.length == 0){
        exp = Number.MAX_VALUE;
    }
    let technicians = await Technician.find({$or: [{price: {$lte:price} } , {expYears: {$lte:exp} }], expYears: {$lte:Number.MAX_VALUE}})

    //7an loop 3ala kol user 7anshof mawgod fe ay technician men aly 3andy wla la2 lw msh mawgod 7a eleimiate him men al users array
    //w 7anzwed alprice w al experience fe al user
    console.log(users);
    console.log("==============")
    console.log(technicians)
    return users
}

module.exports = router;