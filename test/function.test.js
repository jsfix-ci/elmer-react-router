import './mocha.jsdom';
import 'mocha';
import { expect } from 'chai';
import { getDefaultValue, getUriHash, getUriParam, getType, isString } from '../src/core/function';

describe('test function.js export all functions', () => {
    describe('getDefaultValue function test', () => {
        it('should export getDefaultValue function', () => {
            expect(typeof getDefaultValue).to.eq('function');
        });
        it('"getDefaultValue" function returns the default value when not set value', () => {
            expect(getDefaultValue(null, '1111')).to.eq('1111');
        });
    });
    it('"getUriHash" should be an interface function', () => {
        expect(typeof getUriHash).to.eql('function');
    });
    it('"getUriParam" should be an interface function', () => {
        expect(typeof getUriParam).to.eql('function');
    });
    it('"isString" should be an interface function', () => {
        expect(typeof isString).to.eql('function');
    });
    it('"getType" should be an interface function', () => {
        expect(typeof getType).to.eql('function');
    });
    it('"getType" should be get an object prototype string', () => {
        expect(/^\[object\s[A-Z][a-zA-Z]*\]$/.test(getType('test'))).to.eql(true);
    });
});
