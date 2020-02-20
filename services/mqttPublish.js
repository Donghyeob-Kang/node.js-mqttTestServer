const mqtt = require('mqtt');

module.exports.mqttPublish = (mqttInfo, topic, msg, timer) => {
    // console.log(mqttInfo, topic, msg, timer);

    let interval = [];

    const client = mqtt.connect(mqttInfo);

    

    client.on('connect', () => {
        console.log(`mqtt publish connected: ${client.connected}`);
        if (!timer) {
            client.publish(topic, JSON.stringify(msg));
        } else {
            interval = setInterval(() => {
                client.publish(topic, msg);
            }, timer * 1000);
        }
    });
};

// module.exports.mqttPublish = () => {
//     const client = mqtt.connect('mqtt://test.mosquitto.org');

//     client.on('connect', () => {
//         console.log(`mqtt publish connected: ${client.connected}`);
//         client.publish('/test/message', 'test message');
//     });
// };
