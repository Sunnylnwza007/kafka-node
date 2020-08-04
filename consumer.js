'use strict';
require('dotenv').config({path:'./config/.env'});
var ConsumerGroup = require('kafka-node').ConsumerGroup;
const consumerConfig = require('./config/consumerConfig')
const { v4: uuidv4 } = require('uuid');
const perf = require('execution-time')();

// -----Worker Thread-----
const { Worker, isMainThread, parentPort,workerData } = require('worker_threads');
const numCPUs = require('os').cpus().length;
const _ = require('lodash')

// ----- Consumer -----
var consumerGroup = new ConsumerGroup(consumerConfig, 'Normal');
consumerGroup.on('message', onMessage);
consumerGroup.on('error', (err) => {
  console.log(`error on consumerGroup`);
  console.log(err);
});


async function onMessage (message) {
    var messageValue = JSON.parse(JSON.stringify(message.value));
    var obj = JSON.parse(messageValue);
    await WorkerJob(messageValue);
    // console.log(obj);
}

async function  WorkerJob (obj) {
  let dataMessage = JSON.parse(obj)
  var chunk = _.chunk(dataMessage,(dataMessage.length/(numCPUs/2)))
  const threads = new Set();
  perf.start();
  if (isMainThread) {
    for (let i = 0;i<chunk.length;i++){
      let uuid = uuidv4();
      threads.add(new Worker('./controllers/worker.js', {workerData: {uuid: uuid,data: chunk[i]}}));
    }
    for (let worker of threads) {
      worker.on('error', (err) => { throw err; });
      worker.on('exit', () => {
        threads.delete(worker);
        console.log(`----------------------------------\nUpdate to mongoDB take time: ${perf.stop().time}\n----------------------------------`);
        // console.log(`Thread exiting, ${threads.size} running...`);
      })
      worker.on('message', (msg) => {
        console.log(msg)
      });
    }

  }
}