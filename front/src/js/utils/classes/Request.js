/**
 * Request Class
 */
class Request {
    constructor() {
        this.BASE_API_URL = 'http://localhost:3080/api/v1'
    }

    /**
     * Creates an API call and returns datas.
     * @param {String} uri 
     * @param {*} data 
     * @param {String} method 
     * @returns {Object} Payload
     */
    call = async (uri, data = null, method = null) => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json'
        }

        if (!(data instanceof FormData)) {
            headers['Content-Type'] = 'application/json'
        }

        const response = await fetch(`${this.BASE_API_URL}${uri}`, {
            method: this._getFetchMethod(data, method),
            headers,
            body: typeof data === 'object' && data !== null  ? (data instanceof FormData ? data : JSON.stringify(data)) : null
        })
        
        const responseData = await response.json()
        
        if (!response.ok) throw responseData

        return responseData
    }

    /**
     * Returns fetching method.
     * @param {*} data 
     * @param {String} method 
     * @returns {String} Method
     */
    _getFetchMethod = (data, method) => {
        if (typeof data === 'string') {
            if (data === 'DELETE' || data === 'POST') return data
            throw new Error('Invalid method')
        }
        
        if (typeof data === 'object' && data !== null) {
            if (method && method === 'PUT') return method
            if (method && method !== 'PUT') throw new Error('Invalid method')
            return 'POST'
        }

        return 'GET'
    }
}

export default new Request()