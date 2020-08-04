var config = {};

config.consumerOption = {
    kafkaHost: '192.168.122.66:9092',
        batch: undefined,
        groupId: 'testGroup11',
        sessionTimeout: 15000,
        protocol: ['roundrobin'],
        encoding: 'utf8',
        fromOffset: 'latest',
        commitOffsetsOnFirstJoin: true,
        autoCommit: true,
        outOfRangeOffset: 'earliest',
        fetchMaxBytes: 15728640,
        onRebalance: (isAlreadyMember, callback) => { callback()}
}


module.exports = config.consumerOption;