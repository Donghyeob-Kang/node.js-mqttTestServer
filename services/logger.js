const winston = require('winston');
const moment = require('moment'); //한국시간을 나타내기 위한 모듈 추가
const fs = require('fs');
const logDir = 'D:/';

/*로그 만드는 함수(방법) */
module.exports.log = info => {
    if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir);
    }

    let logger = winston.createLogger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: 'info',
                timestamp: function() {
                    //한국 시간 나타내는법
                    // return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
                }
            }),
            new (require('winston-daily-rotate-file'))({
                level: 'info',
                filename: `${logDir}/log.log`,
                prepend: true,
                timestamp: function() {
                    //한국 시간 나타내는법
                    return moment().format('YYYY-MM-DD HH:mm:ss');
                }
            })
        ]
    });
    try {
        logger.info(info);
    } catch (exception) {
        logger.error('ERROR=>' + exception);
    }
};
