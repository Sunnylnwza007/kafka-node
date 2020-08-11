const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// let Sms = new Schema({
//     uuid: {type:String , required: true},
//     CMD: {type:String, required: true},
//     FROM: {type:String, required: true},
//     TO: {type:String, required: true},
//     REPORT: {type:String, required: true},
//     CHARGE: {type:String, required: true},
//     CODE: {type:String, required: true},
//     CTYPE: {type:String, required: true},
//     CONTENT: {type:String, required: true},
//     EXPIRE: {type:String, required: true},
//     SMID: {type:String,required:false}
// });

let Sms = new Schema({
    send_id: {type:String, required: true},
    schedule_id: {type:String, required:true},
    send_code: {type:String, required:true},
    maincmp_id: {type:Number,required:true},
    cmp_id: {type:String,required:true},
    cmp_name: {type:String,required:true},
    user_id: {type:Number,required:true},
    type_id: {type:String,required:true},
    nummsg: {type:Number, required:true},
    price_cmp: {type:String, required:true},
    is_cmpPremium: {type:String,required:true},
    lang: {type:String,required:true},
    sendername: {type:String,required:true},
    sendtime: {type:Date,required:false},
    message: {type:String,required:true},
    logFolder: {type:String,require:true},
    batchfile: {type:String,require:true},
    ophone: {type:String,required:true},
    operator: {type:String,required:true},
    credituse: {type:String,required:true},
    numAISGW: {type:Number,required:true},
    numOphone: {type:Number,required:true},
    is_premiumroute: {type:Number,required:true},
    gateway: {type:String,required:true},
    numberGW: {type:Number,required:true},
    validityPeriod: {type:String,required:true},
    refid: {type:String,required:false},
    smid: {type:String,required:false},
    send_status: {type:String,required:false},
    send_detail: {type:String,required:false},
    sendoper_time: {type:Date,required:false},
    priceGW: {type:Number,required:true},
    numsend: {type:Number,required:true,default: 0},
    status_logSend: {
        numlog: {type:Number,required:true,default:0},
        slog: [ new Schema({
            smid: {type:String,required:false},
            DRstatus: {type:String,required:false},
            DRdetail: {type:String,required:false},
            gateway: {type:String,required:false},
            sendoper_time: {type:Date,required:false}
            }) 
        ]
    },
    is_process_dr: {type:String,required:false},
    dr_status: {type:String,required:false},
    dr_detail: {type:String,required:false},
    dr_date: {type:Date,required:false},
    dr_flagstatus: {type:String,required:false},
    old_id: {type:String,required:false},
})
module.exports = mongoose.model('sms', Sms);