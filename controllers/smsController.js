const smsModel = require('../models/smsModel');
exports.create = function (req, res) {
    console.log(req)
    let sms = new smsModel({
        uuid: req.uuid,
        CMD: req.CMD,
        FROM: req.FROM,
        TO: req.TO,
        REPORT: req.REPORT,
        CHARGE: req.CHARGE,
        CODE: req.CODE,
        CTYPE: req.CTYPE,
        CONTENT: req.CONTENT,
        EXPIRE: req.EXPIRE,
        SMID: req.SMID
    });
    smsModel.create(sms)
}

exports.insert = function (req,res){
    return new Promise((resolve,reject) =>{
        smsModel.insertMany(req, (error,res)=>{
            if (error) reject(error)
            resolve(res)
        })
    })
}


exports.updateSMID = function (req,res){
    smsModel.updateOne({'uuid': req.uuid},{$set:{"SMID": req.SMID}},function(err,res){
        if (err) console.log(err);
        console.log(res)
    })
}

exports.updateLastSMID = function (req,res){
    return new Promise((resolve,reject)=>{
        smsModel.updateOne({'uuid': req.uuid},{$set:{"SMID": req.SMID}},function(err,res){
            if (err) console.log(err);
            resolve(res)
        })
    })
}