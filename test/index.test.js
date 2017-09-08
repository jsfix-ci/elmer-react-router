import './mocha.jsdom';
import 'mocha';
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { ElmerRouter } from '../src';

describe('Router test', () => {
    let ElmerElement = null;
    beforeEach(() => {
        ElmerElement = mount(<ElmerRouter pages={{}} statePages={{}} />);
    });
    it('Should have ElmerRouter class export', () => {
        expect(typeof ElmerRouter).to.eql('function');
    });
    it('ElmerElement must be the React Component', () => {
        expect(typeof ElmerElement.type).to.eql('function');
    });
});
