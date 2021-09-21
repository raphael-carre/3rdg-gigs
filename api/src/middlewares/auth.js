const FetchErrorHandler = require('../config/FetchErrorHandler')
const Security = require('../config/Security')

const auth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) throw new FetchErrorHandler(401, 'Requête non authentifiée !')

        const token = req.headers.authorization.split(' ')[1]
        const userId = Security.decodeJwt(token)

        if (req.body.userId && req.body.userId !== userId) throw new FetchErrorHandler(401, 'Identifiant utilisateur invalide !')
        else next()
    }
    catch (error) {
        res.status(error.statusCode || 400).send(error)
    }
}

module.exports = auth