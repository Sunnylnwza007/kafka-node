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
    smsModel.updateOne({'send_id': req.send_id},{$set:{"smid": req.smid}},function(err,res){
        if (err) console.log(`From Controller: ${err}`);
        // console.log(res)
    })
}

exports.updateLastSMID = function (req,res){
    return new Promise((resolve,reject)=>{
        smsModel.updateOne({'send_id': req.send_id},{$set:{"smid": req.smid}},function(err,res){
            if (err) console.log(`From Controller: ${err}`);
            resolve(res)
        })
    })
}