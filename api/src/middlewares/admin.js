const FetchErrorHandler = require('../config/FetchErrorHandler')
const Security = require('../config/Security')
const User = require('../manager/User/UserModel')

const adminAuth = async (req, res, next) => {
    try {
        const tokenId = Security.decodeJwt(req.headers.authorization.split(' ')[1])
    
        const currentUser = await User.findOne({ attributes: ['isAdmin'], where: { id: tokenId } })
        if (!currentUser) throw new FetchErrorHandler(401)
    
        if (!req.body.adminUser && currentUser.isAdmin && req.body.adminUser === undefined) { req.body.adminUser = true }
    
        next()
    }
    catch (error) {
        res.status(error.statusCode || 500).send(error)
    }
}

module.exports = adminAuth