import React from 'react';
import { shallow } from 'enzyme';
import BeerDetailsView from './BeerDetailsView';

const beerData = {
  id: 1,
  name: 'Beer 1',
  tagline: 'Beer Tagline.',
  description: 'Beer Description.',
  brewers_tips: 'Brewers Tips.',
  image_url: 'image_url.png',
  food_pairing: ['food1', 'food2'],
  ibu: 60,
  abv: 5,
  ebc: 20
};
const defaultProps = {
  beerData: beerData,
  similarBeers: [],
  loading: false,
  error: false
};

describe('BeerDetailsView Component', () => {
  let component;

  beforeEach(() => {
    component = shallow(
      <BeerDetailsView {...defaultProps} />
    );
  });

  it('renders without crashing', () => {
    expect(component.exists()).toBe(true);
  });

  it('renders proper basic details', () => {
    expect(component.find('h5').text()).toEqual(beerData.name);
    expect(component.find('.tagline').text()).toEqual(beerData.tagline);
    expect(component.find('.description').text()).toEqual(beerData.description);
    expect(component.find('.tips > div').text()).toEqual(beerData.brewers_tips);
    expect(component.find('BeerImage').props().src).toEqual(beerData.image_url);
  });

  it('renders beer properties', () => {
    expect(component.find('.properties > li').length).toBe(3);
    expect(component.find('.properties > li').at(0).text()).toEqual(`IBU: ${beerData.ibu}`);
    expect(component.find('.properties > li').at(1).text()).toEqual(`ABV: ${beerData.abv}%`);
    expect(component.find('.properties > li').at(2).text()).toEqual(`EBC: ${beerData.ebc}`);
  });

  it('renders best served with', () => {
    expect(component.find('.pairing > ul > li').length).toBe(2);
    expect(component.find('.pairing > ul > li').at(0).text()).toEqual(`- ${beerData.food_pairing[0]}`);
    expect(component.find('.pairing > ul > li').at(1).text()).toEqual(`- ${beerData.food_pairing[1]}`);
  });

  it('does not render error or loading', () => {
    expect(component.find('.error').length).toBe(0);
    expect(component.find('.loader').length).toBe(0);
  });

  it('renders error', () => {
    component.setProps({ error: true });
    expect(component.find('.error').length).toBe(1);
  });

  it('renders loading', () => {
    component.setProps({ loading: true });
    expect(component.find('.loader').length).toBe(1);
  });
});
