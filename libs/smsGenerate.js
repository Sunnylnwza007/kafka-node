let obj = [];
const { v4: uuidv4 } = require('uuid');
var faker = require('faker');


function sms(num){
        let i;
        for (i =0;i<num;i++){
            let uuid = uuidv4();
            obj.push({
                    uuid: uuid,
                    CMD: 'SENDMSG',
                    FROM: 'SMSMKT.COM',
                    TO: faker.phone.phoneNumber('08########'),
                    REPORT: 'Y',
                    CHARGE: 'Y',
                    CODE: 'ClickNext_BulkSMS',
                    CTYPE: 'TEXT',
                    CONTENT: 'test hi hello JA NiHAO NE JO',
                    EXPIRE: '200605123903',
                    SMID: null
            })
        }
        return obj;
}

module.exports = {
    sms
}

