import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header';

describe('The Header Component', () => {
    it('renders without crashing', async () => {
        const wrapper = shallow(<Header />);
        expect(wrapper.exists()).toBe(true);
    });
});