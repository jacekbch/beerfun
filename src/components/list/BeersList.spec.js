import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import BeersList from './BeersList';
import { API_URL, BEERS_PER_PAGE } from './../constants';

const axiosMock = new AxiosMockAdapter(axios);

const beersList = [
  { id: 1, name: 'Beer 1' },
  { id: 2, name: 'Beer 2' }
];
const defaultParams = {
  page: 1,
  per_page: BEERS_PER_PAGE
};

describe('BeersList Component', () => {
  let component;

  axiosMock.onGet(`${API_URL}/beers`, defaultParams).reply(200, beersList);

  beforeEach(() => {
    component = shallow(
      <BeersList />
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('gets beers list', async () => {
    component.setState({ error: false });
    axiosMock.onGet(`${API_URL}/beers`, { page: 3, per_page: BEERS_PER_PAGE }).reply(200, beersList);
    await component.instance().loadBeers(3);
    expect(component.state().beersList).toEqual(beersList);
  });
});
