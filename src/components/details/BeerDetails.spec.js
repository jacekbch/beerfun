import React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import BeerDetails from './BeerDetails';
import { API_URL } from './../constants';

const axiosMock = new AxiosMockAdapter(axios);

const beerId = 3;
const beerData = {
  id: 3,
  name: 'Beer 3',
  tagline: 'Beer Tagline.',
  description: 'Beer Description.',
  image_url: 'image_url.png',
  ibu: 60,
  abv: 5,
  ebc: 20
};
const similarBeers = ['similar1', 'similar2'];
const similarBeersParams = {
  abv_gt: 0,
  abv_lt: 15,
  ebc_gt: 10,
  ebc_lt: 30,
  ibu_gt: 50,
  ibu_lt: 70,
  page: 1,
  per_page: 3
};

describe('BeerDetails Component', () => {
  let component;

  axiosMock.onGet(`${API_URL}/beers/3`).reply(200, [beerData]);
  axiosMock.onGet(`${API_URL}/beers`, similarBeersParams).reply(200, similarBeers);

  beforeEach(() => {
    component = shallow(
      <BeerDetails id={beerId} />
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('gets all necessary data', async () => {
    component.setState({ loading: false, error: false });
    await component.instance().getData();
    expect(component.state().beerData).toEqual(beerData);
    expect(component.state().loading).toBe(false);
    expect(component.state().error).toBe(false);
    expect(component.state().similarBeers).toEqual(similarBeers);
  });

  it('sets error state if request fails', async () => {
    axiosMock.onGet(`${API_URL}/beers/3`).reply(404);
    component.setState({ loading: false, error: false });
    await component.instance().getData();
    expect(component.state().error).toBe(true);
  });
});
