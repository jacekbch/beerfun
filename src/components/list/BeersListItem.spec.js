import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import BeersListItem from './BeersListItem';

const beerData = {
  id: 1,
  name: 'Beer 1',
  tagline: 'Beer Tagline.',
  image_url: 'image_url.png',
};

describe('BeersListItem Component', () => {
  let component;

  beforeEach(() => {
    component = mount(
      <MemoryRouter>
        <BeersListItem beerData={beerData} />
      </MemoryRouter>
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders proper data', () => {
    expect(component.find('.name').text()).toEqual(beerData.name);
    expect(component.find('.tagline').text()).toEqual(beerData.tagline);
    expect(component.find('BeerImage').props().src).toEqual(beerData.image_url);
  });
});
