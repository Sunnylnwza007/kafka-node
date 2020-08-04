const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Sms = new Schema({
    uuid: {type:String , required: true},
    CMD: {type:String, required: true},
    FROM: {type:String, required: true},
    TO: {type:String, required: true},
    REPORT: {type:String, required: true},
    CHARGE: {type:String, required: true},
    CODE: {type:String, required: true},
    CTYPE: {type:String, required: true},
    CONTENT: {type:String, required: true},
    EXPIRE: {type:String, required: true},
    SMID: {type:String,required:false}
});
module.exports = mongoose.model('sms', Sms);