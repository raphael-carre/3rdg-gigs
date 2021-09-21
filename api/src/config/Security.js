const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const FetchErrorHandler = require('./FetchErrorHandler')

/**
 * Security Class
 */
class Security {
    /**
     * Creates a hash for the given string
     * @param {string} string 
     * @returns {Promise} Hash or error
     */
    static hash(string) {
        return bcrypt.hash(string, 10)
    }

    /**
     * Compares two strings matching their Bcrypt hash.
     * @param {string} string 
     * @param {string} stringToMatch 
     * @returns {Promise} Boolean or error
     */
    static compareHash(string, stringToMatch) {
        return bcrypt.compare(string, stringToMatch)
    }

    /**
     * Creates a JSON Web Token based on a user id.
     * @param {string} userId 
     * @returns {string} JSON Web Token
     */
    static createJwt(userId) {
        return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '24h' })
    }

    /**
     * Decodes a JSON Web Token and returns the user id.
     * @param {string} token 
     * @returns {number} User id
     */
    static decodeJwt(token) {
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
            return decodedToken.userId
        }
        catch (error) {
            throw new FetchErrorHandler(401, 'Token invalide')
        }
    }
}

module.exports = Security