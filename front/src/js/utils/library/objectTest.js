/**
 * Check if object 1 and 2 are strictly similar.
 * @param {Object} obj1 Object 1
 * @param {Object} obj2 Object 2
 * @returns {Boolean}
 */
export const objectEquality = (obj1, obj2 = {}) => {
    for (let prop in obj1) {
        if (!obj2.hasOwnProperty(prop)) return false
        if (obj1[prop] !== obj2[prop]) return false
    }
    for (let prop in obj2) {
        if (!obj1.hasOwnProperty(prop)) return false
        if (obj2[prop] !== obj1[prop]) return false
    }
    return true
}

/**
 * Check if object 1 includes the same propety/value as object2.
 * @param {Object} obj1 Object 1
 * @param {Object} obj2 Object 2
 * @returns {Boolean}
 */
export const objectIncluded = (obj1, obj2) => {
    for (let prop in obj2) {
        if (!obj1.hasOwnProperty(prop)) return false
        if (obj1[prop] !== obj2[prop]) return false
    }
    return true
}

/**
 * Check for empty string values in an object.
 * @param {Object} object Object to test
 * @returns {Boolean}
 */
export const checkForEmptyProperty = object => {
        return (Object.values(object).some(value => value === '' || !value)) ? true : false
    }