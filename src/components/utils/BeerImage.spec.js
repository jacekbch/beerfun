import React from 'react';
import { shallow } from 'enzyme';
import BeerImage from './BeerImage';

const imageSrc = 'image.png';

describe('BeerImage Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <BeerImage src={imageSrc} />
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
    expect(component.find('Img').props().src).toEqual(imageSrc);
  });
});
