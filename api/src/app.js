const express = require('express')
const helmet = require('helmet')
const loggerMiddleware = require('./middlewares/logger-middleware')
const { swaggerUi, swaggerConfig } = require('./middlewares/swagger')

const app = express()

let helmetOptions = { useDefaults: true }

if (process.env.NODE_ENV === 'development') {
    helmetOptions = {...helmetOptions, directives : { scriptSrc: ["'self'", "'unsafe-inline'"] }}
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN)
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use(express.json())
app.use(helmet())
app.use(loggerMiddleware)

if (process.env.NODE_ENV === 'development') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig))
    app.use('/jsdoc', helmet.contentSecurityPolicy(helmetOptions), express.static('./docs/jsdoc'))

    app.get('/', (req, res) => {
        res.status(301).redirect('/api-docs')
    })
} else {
    app.get('/', (req, res) => {
        res.status(200).json({message: `Server is running on http://localhost:${process.env.SERVER_PORT} !`})
    })
}

module.exports = app