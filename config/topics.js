var config = {};
config.topics = 
    [{
        topic: 'Normal',
        partitions: 3,
        replicationFactor: 3
      },
      {
        topic: 'Premium',
        partitions: 3,
        replicationFactor: 3,
      },
      {
        topic: 'DR',
        partitions: 3,
        replicationFactor: 3,
      },
      {
        topic: 'SMID',
        partitions: 3,
        replicationFactor: 3,
      }];
      
module.exports = config.topics;
