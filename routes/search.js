
var express = require('express');
var router = express.Router();

router.get("/health", healthCheck)


function healthCheck(req,res){
    res.send("healthy");
    console.log("hello");
}

router.post("/",getAllTechnicians)

function getAllTechnicians(req,res){

    console.log(req.body)

}

module.exports = router;