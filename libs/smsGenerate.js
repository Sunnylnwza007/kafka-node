let obj = [];
let doc = [];
const { v4: uuidv4 } = require('uuid');
var faker = require('faker');


// function sms(num){
//         let i;
//         for (i =0;i<num;i++){
//             let uuid = uuidv4();
//             obj.doc.push({
//                     uuid: uuid,
//                     CMD: 'SENDMSG',
//                     FROM: 'SMSMKT.COM',
//                     TO: faker.phone.phoneNumber('08########'),
//                     REPORT: 'Y',
//                     CHARGE: 'Y',
//                     CODE: 'ClickNext_BulkSMS',
//                     CTYPE: 'TEXT',
//                     CONTENT: 'test hi hello JA NiHAO NE JO',
//                     EXPIRE: '200605123903',
//                     SMID: null
//             })
//         }
//         return obj;
// }

function sms(num){
    let i;
    for (i =0;i<num;i++){
        let uuid = uuidv4();
        doc.push({
            send_id: uuid,
            schedule_id: "0",
            send_code: "SN-63-13627-1111241682",
            maincmp_id: 13627,
            cmp_id: "13627",
            cmp_name: "บริษัท โค้วยู่ฮะ มอเตอร์ จำกัด สำนักงานใหญ่",
            user_id: 15720,
            type_id: "15",
            nummsg: 1,
            price_cmp: "0.35",
            is_cmpPremium: 1,
            lang: "THAI",
            sendername: "KOWYOOHAH",
            sendtime: "2020-06-17 11:08:24",
            message: "รหัสยืนยันในการสมัครสมาชิกของคุณคือ : 976015",
            logFolder: "15/85181",
            batchfile: "batchfile_1.xml",
            ophone: faker.phone.phoneNumber('08########'),
            operator: "AIS",
            credituse: "1",
            numAISGW: 1,
            numOphone: 1,
            is_premiumroute: 1,
            gateway: "AISGW",
            numberGW: 4,
            validityPeriod: "0",
            refid: "",
            smid: null,
            send_status: null,
            send_detail: null,
            sendoper_time: null,
            priceGW: 0.16,
            numsend: 0,
            status_logSend: {
              numlog: 0,
              slog: []
            },
            is_process_dr: null,
            dr_status: null,
            dr_detail: null,
            dr_date: null,
            dr_flagstatus: null,
            old_id: null
        })
    }
    obj= {doc}
    return obj;
}

module.exports = {
    sms
}

