const { Worker, isMainThread, parentPort,workerData } = require('worker_threads');
const trueOperator = require('./TrueOperator')

console.log('|---------------Working----------------|')


trueOperator.sendToTRUE(workerData.data);