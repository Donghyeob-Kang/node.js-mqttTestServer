const {createLogger, format, transports} = require('winston');
require('winston-daily-rotate-file')
const fs = require('fs');
const path = require('path');
const logDir = 'D:/log';

module.exports.logger = () => {
    if (!fs.existsSync(logDir)){
        fs.mkdirSync(logDir)
    }

    const dailyRotateFileTransport = new transports.DailyRotateFile({
        filename: `${logDir}/%DATE%-result.log`,
        datePattern: 'YYYY-MM-DD'
    })

    createLogger({
        level: 'info',
        format: format.combine(
            format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
        ),
        transports: [
            new transports.Console({
            level: 'info',
            format: format.combine(
                format.printf(
                    info => `${info.timestamp} ${info.level}: ${info.message}`
                )
            )
        }),
            dailyRotateFileTransport
        ]
    })
}