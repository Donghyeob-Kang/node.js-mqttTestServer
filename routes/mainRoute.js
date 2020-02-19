const router = require('express').Router();
const mqttPublish = require('../services/mqttPublish');
const mqttSubscribe = require('../services/mqttSubscribe');

router.get('/', (req, res) => {
    res.render('main');
});

router.post('/sendData', (req, res) => {
    let url = req.body.url;
    let port = req.body.port;
    let id = req.body.id;
    let passwd = req.body.passwd;
    let topic = req.body.topic;
    let msg = req.body.msg;
    let timer = req.body.timer;

    if (id && passwd) {
        mqttInfo = url + ':' + port + ', { username: ' + id + ', password: ' + passwd + '}';
    } else if (port) {
        mqttInfo = url + ':' + port;
    } else {
        mqttInfo = url;
    }

    mqttPublish.mqttPublish(mqttInfo, topic, msg, timer);
    // mqttPublish.mqttPublish();
});

router.post('/startSub', (req, res) => {
    let url = req.body.url;
    let port = req.body.port;
    let id = req.body.id;
    let passwd = req.body.passwd;
    let topic = req.body.topic;

    if (id && passwd) {
        mqttInfo = url + ':' + port + ', { username: ' + id + ', password: ' + passwd + '}';
    } else if (port) {
        mqttInfo = url + ':' + port;
    } else {
        mqttInfo = url;
    }

    mqttSubscribe.mqttSubscribe(mqttInfo, topic);
    // mqttSubscribe.mqttSubscribe();
});

module.exports = router;
