// -----ENV-----
require('dotenv').config({path:'./config/.env'});
const url = process.env.MONGODB;
const producerConfig = require('./config/producerConfig')

// -----Controller-----
const smsGenerate = require('./libs/smsGenerate')
const smsController = require('./controllers/smsController');

// -----SET KAFKA PRODUCER-----
var kafka = require('kafka-node');
var Producer = kafka.HighLevelProducer;
var Client = kafka.KafkaClient;
var client = new Client({ kafkaHost: process.env.KAFKA });
var producer = new Producer(client, producerConfig.config);

// -----CONNECT Mongodb-----
var mongoose = require('mongoose');
mongoose.connect(url+'/SMS', { useNewUrlParser: true, useUnifiedTopology: true })


let obj = smsGenerate.sms(20000);
var json = JSON.stringify(obj);
producer.on('ready',async function () {
    console.log('ready')
    await smsController.insert(obj);
    producer.send([{topic: 'Normal',messages: json , attributes: 1}], function (
      err,
      result
    ) {
      console.log(err || result);
      process.exit();
    });
});

producer.on('error', function (err) {
  console.log('error', err);
})