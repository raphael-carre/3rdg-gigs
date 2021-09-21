const logger = require('../config/Winston')

module.exports = (req, res, next) => {
    let requestInfo = `Incoming request: ${req.method} -> ${req.path}`
    if (typeof req.query === 'object' && JSON.stringify(req.query) !== '{}') { requestInfo += `\n  Query: ${JSON.stringify(req.query)}` }
    if(process.env.NODE_ENV === 'development') {
        if (typeof req.body === 'object' && JSON.stringify(req.body) !== '{}') { requestInfo += `\n  Content: ${JSON.stringify(req.body)}`}
    }
    
    let originalSend = res.send
    let counter = 0
    res.send = function (data) {
        if (res.statusCode >= 400 && counter === 0) {
            logger.info(requestInfo)
            if (typeof data === 'string') {
                const parsedData = JSON.parse(data)
                logger.error(`${res.statusCode}\n${parsedData.error}`)
            } else {
                logger.error(`${res.statusCode}\n`, data)
            }
        }
        counter++ 
        originalSend.apply(res, arguments)
    }
    next()
}