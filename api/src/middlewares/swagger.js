const fs = require('fs')
const swaggerUi = require('swagger-ui-express')
const jsDoc = require('swagger-jsdoc')
const YAML = require('js-yaml')

const swaggerConfig = jsDoc(YAML.load(fs.readFileSync(process.cwd() + '/docs/swagger/index.yaml'), 'utf8'))

module.exports = { swaggerUi, swaggerConfig }