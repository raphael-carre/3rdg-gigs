const Validator = require('../config/Validator')

const validation = (req, res, next) => {
    const validator = new Validator()
    const body = req.body
    let datas

    if (req.file) {
        for (let key in body) {
            typeof body[key] === 'string' && (datas = JSON.parse(body[key]))
        }
    } else {
        datas = body
    }

    try { 
        validator.test(datas)

        if (req.file) {
            for (let key in body) {
                typeof body[key] === 'string' && (req.body[key] = JSON.stringify(validator.sanitize(datas)))
            }
        } else {
            req.body = validator.sanitize(datas)
        }
        next()
    }
    catch (error) { return res.status(400).send(error) }
}

module.exports = validation