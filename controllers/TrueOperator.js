// const { insertSMID } = require("./controllerSendTopicToKafka")

const axios = require("axios");
const moment = require("moment");
var xml2js = require("xml2js");
var parseString = require("xml2js").parseString;
var builder = new xml2js.Builder({xmldec:{'version': '1.0', 'encoding': 'TIS-620'}});
var xmlTrue = require('../models/xmlTrue')
const MAX_REQUESTS_COUNT = 100;
const INTERVAL_MS = 1000;
let PENDING_REQUESTS = 0;
// create new axios instance
const api = axios.create({});
var i = 0
var data;
var config = {
  headers: {'Content-Type': 'text/xml'}
};

//-----Controller-----
const smsController = require('./smsController');

//-----Mongo-----
var mongoose = require('mongoose');
const dotenv = require('dotenv').config({path:'../config/.env'});;
const url = process.env.MONGODB;
mongoose.connect(url+'/SMS', { useNewUrlParser: true, useUnifiedTopology: true})

/**
 * Axios Request Interceptor
 */
api.interceptors.request.use(function (config) {
  return new Promise((resolve, reject) => {
    // console.log(config)
    let log = `start : ${moment().format("YYYY-MM-DD HH:mm:ss")}\n`;
    let interval = setInterval(() => {
        if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
            PENDING_REQUESTS++
            clearInterval(interval)
            resolve(config)
        }
    }, INTERVAL_MS)
  });
});

/**
 * Axios Response Interceptor
 */
api.interceptors.response.use(
    
  async (response) => {
    i--;
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
    var res = await convertXMLToJSON(response.data);
    // console.log(JSON.stringify(res.message.$.id))
    var uuid = res.message.rsr[0]['service-id'][0];
    var smid = res.message.$.id;
    console.log(i)
    // -----Update-----
    if (i==0){
        console.log('wow')
        await smsController.updateLastSMID({"uuid": uuid,"SMID":smid})
        mongoose.connection.close();
    }else{
        smsController.updateSMID({"uuid": uuid,"SMID":smid})
    }

    return Promise.resolve(response.data);
  },
  function (error) {
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1);
    return Promise.reject(error);
  }
);

const convertXMLToJSON = (xml) => {
  return new Promise((resolve, reject) => {
    try {
        parseString(xml, function (err, result) {
            resolve(result);
        });
    } catch (error) {
      reject(error);
    }
  });
};

const sendToTRUE = async (params) => {
    i = params.length;
    try {
        for (let i = 0; i < params.length; i++) {
            var xml = await xmlTrue.convertJSONToXML(params[i])
            api.post(`http://192.168.60.37/SMSLink/SendMsg/TRUE.php`,xml,config)
        }
    } catch (error) {
        console.log("error : ", error);
    }
};

module.exports.sendToTRUE = sendToTRUE;
