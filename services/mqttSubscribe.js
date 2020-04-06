const mqtt = require("mqtt");
const log = require("./logger");

module.exports.mqttSubscribe = (mqttInfo, topic) => {
  // console.log(mqttInfo, topic);

  const client = mqtt.connect(mqttInfo);

  client.subscribe(topic);

  client.on("connect", () => {
    console.log(`mqtt subscribe connected: ${client.connected}`);
  });

  client.on("message", (topic, message) => {
    console.log("subscribe done");
    let msg = JSON.parse(message);
    // let msg = message.toString();

    // console.log(msg);
    log.logger(msg);
  });
};

// module.exports.mqttSubscribe = () => {
//     // console.log(mqttInfo, topic);

//     const client = mqtt.connect('mqtt://test.mosquitto.org');

//     client.subscribe('/test/message');

//     client.on('connect', () => {
//         console.log(`mqtt subscribe connected: ${client.connected}`);
//     });

//     client.on('message', (topic, message) => {
//         console.log('subscribe done');
//         // let msg = JSON.parse(message.toString());
//         let msg = message.toString();
//         client.end();

//         console.log('subscribe message : ' + msg);
//     });
// };
