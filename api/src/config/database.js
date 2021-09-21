const { Sequelize } = require('sequelize')
const logger = require('./Winston')

const db = new Sequelize(
    `${process.env.DB_NAME}${process.env.NODE_ENV === 'test' ? 'test' : ''}`,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: process.env.NODE_ENV === 'development' ? msg => logger.info(`\n${msg}`) : false
    }   
)

const dbConnection = async db => {
    try {
        await db.authenticate()
        await db.sync()
        logger.info('MySQL database connected !')
    }
    catch (error) {
        logger.error('Connection to MySQL failed !\n', error.message)
        const timeout = setTimeout(async () => {
            await dbConnection(db)
            clearTimeout(timeout)
        }, 5000)
    }
}

module.exports = {db, dbConnection}