import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader';

describe('Loader Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <Loader />
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });
});
