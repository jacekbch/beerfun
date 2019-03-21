import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import SimilarBeers from './SimilarBeers';

const similarBeers = [
  {
    id: 1,
    name: 'Beer 1',
    image_url: 'image_url_1.png',
  },
  {
    id: 2,
    name: 'Beer 2',
    image_url: 'image_url_2.png',
  }
];

describe('SimilarBeers Component', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <SimilarBeers similarBeers={similarBeers} />
      </MemoryRouter>
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders proper beers list', () => {
    expect(component.find('.similar-beers-items > .beer').length).toBe(2);
    expect(component.find('.similar-beers-items > .beer').at(0).find('.name').text()).toEqual(similarBeers[0].name);
    expect(component.find('.similar-beers-items > .beer').at(1).find('.name').text()).toEqual(similarBeers[1].name);
  });
});
