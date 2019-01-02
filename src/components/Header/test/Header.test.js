import React from 'react';
import Enzyme from 'enzyme';
import Header from '../Header.component';

it('renders without crashing', () => {
  const wrapper = Enzyme.shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});
