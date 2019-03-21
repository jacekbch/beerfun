import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Header />
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });
});
