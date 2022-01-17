import { checkForEmptyProperty, objectEquality, objectIncluded } from './objectTest'

describe('Libray : objectTest', () => {

    describe('checkForEmptyProperty', () => {

        it('should return false if the object property contains string value', () => {
            const test = checkForEmptyProperty({test: 'test'})
            expect(test).toBeFalsy()
        })

        it('should return true if the object property value is an empty string', () => {
            const test = checkForEmptyProperty({test: ''})
            expect(test).toBeTruthy()
        })

        it('should return true if one of the object properties value is an empty string', () => {
            const test = checkForEmptyProperty({test: 'test', test2: ''})
            expect(test).toBeTruthy()
        })

        it('should return true if one of the object properties value is null', () => {
            const test = checkForEmptyProperty({test: 'test', test2: null})
            expect(test).toBeTruthy()
        })
    })

    describe('objectEquality', () => {

        it('should return true if only 1 empty object is given', () => {
            const test = objectEquality({})
            expect(test).toBeTruthy()
        })

        it('should return false if only one object is given', () => {
            const test = objectEquality({test: 'test'})
            expect(test).toBeFalsy()
        })

        it('should return false if first object has no property', () => {
            const test = objectEquality({}, {test: 'test'})
            expect(test).toBeFalsy()
        })

        it('should return false if second object has no property', () => {
            const test = objectEquality({test: 'test'}, {})
            expect(test).toBeFalsy()
        })

        it('should return false if first object has a property second object has not', () => {
            const test = objectEquality({test: 'test'}, {})
            expect(test).toBeFalsy()
        })

        it('should return false if first object with 2 properties, has a property second object has not', () => {
            const test = objectEquality({test: 'test', test2: 'test2'}, {test: 'test'})
            expect(test).toBeFalsy()
        })

        it('should return false if second object has a property first object has not', () => {
            const test = objectEquality({}, {test: 'test'})
            expect(test).toBeFalsy()
        })

        it('should return false if second object with 2 properties has a property first object has not', () => {
            const test = objectEquality({test: 'test'}, {test: 'test', test2: 'test2'})
            expect(test).toBeFalsy()
        })

        it('should return false if one of the properties have diffent names', () => {
            const test = objectEquality({test: 'test', test1: 'test1'}, {test: 'test', test2: 'test1'})
            expect(test).toBeFalsy()
        })

        it('should return false if objects have the same properties but not the same values', () => {
            const test = objectEquality({test: 'test', test1: 'test1'}, {test: 'test', test1: 'test2'})
            expect(test).toBeFalsy()
        })

        it('should return true if objects have similar pair of key/values', () => {
            const test = objectEquality({test: 'test'}, ({test: 'test'}))
            expect(test).toBeTruthy()
        })

        it('should return true if objects have similar pair key/values in a different order', () => {
            const test = objectEquality({test: 'test', test1: 'test1'}, {test1: 'test1', test: 'test'})
            expect(test).toBeTruthy()
        })
    })

    describe('objectIncluded', () => {

        it('should return false if first object does not include second object property', () => {
            const test = objectIncluded({test: 'test'}, {test1: 'test1'})
            expect(test).toBeFalsy()
        })

        it('should return true is both object have the same pair key/value properties', () => {
            const test = objectIncluded({test: 'test'}, {test: 'test'})
            expect(test).toBeTruthy()
        })

        it('should return false if both object have the same property but not the same values', () => {
            const test = objectIncluded({test: 'test'}, {test: 'test1'})
            expect(test).toBeFalsy()
        })

        it('should return false if first object does not include one of the second object properties', () => {
            const test = objectIncluded({test: 'test'}, {test: 'test', test1: 'test1'})
            expect(test).toBeFalsy()
        })

        it('should return true if first object includes every properties from the second object', () => {
            const test = objectIncluded({test: 'test', test1: 'test1'}, {test: 'test'})
            expect(test).toBeTruthy()
        })
    })
})