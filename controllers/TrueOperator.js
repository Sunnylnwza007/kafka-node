// const { insertSMID } = require("./controllerSendTopicToKafka")

const axios = require("axios");
const moment = require("moment");
var xml2js = require("xml2js");
var parseString = require("xml2js").parseString;
var builder = new xml2js.Builder({xmldec:{'version': '1.0', 'encoding': 'TIS-620'}});

const MAX_REQUESTS_COUNT = 150;
const INTERVAL_MS = 1000;
let PENDING_REQUESTS = 0;

// create new axios instance
const api = axios.create({});
var dataLength = 0
var config = {
  headers: {'Content-Type': 'text/xml'}
};

var xmlTrue = require('../models/xmlTrue')

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
    try {
      let interval = setInterval(() => {
        if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
            PENDING_REQUESTS++
            clearInterval(interval)
            resolve(config)
        }
      }, INTERVAL_MS)
    } catch (error) {
      reject(error); 
    }
  });
});

/**
 * Axios Response Interceptor
 */
api.interceptors.response.use(
  async (response) => {
    //-----Log here-----
    //==========================================

    //==========================================
    dataLength--;
    PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
    var res = await convertXMLToJSON(response.data);
    // console.log(JSON.stringify(res.message.$.id))
    var uuid = res.message.rsr[0]['service-id'][0];
    var smid = res.message.$.id;

    console.log(dataLength)

    // -----Update-----
    if (dataLength==0){
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

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   

const sendToTRUE = async (params) => {
  dataLength = params.length;
  try {
    for (let i = 0; i < params.length; i++) {
      var xml = await xmlTrue.convertJSONToXML(params[i])
        api.post(`http://192.168.60.37:8100/send-sms-true`,xml,config)
      }
    } catch (error) {
      console.log("error : ", error);
    }
};

module.exports.sendToTRUE = sendToTRUE;
