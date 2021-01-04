
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
    if(req.body.name.trim().length){
        console.log(req.body.name)
        getTechnician(req.body.name).then(result => res.render('search', { arr: result }))
        return
    }
    let techs = await User.find({isDentist: false});
    console.log(techs)
    // res.send(technicians)
    res.render('search', { arr: techs });
}

async function getTechnician(name,res){
    let nameRegex = new RegExp(`.*${name}.*`,"i")
    let technicians = await User.find({ firstName: nameRegex, isDentist: false })
    console.log(technicians);
    return technicians
}

module.exports = router;