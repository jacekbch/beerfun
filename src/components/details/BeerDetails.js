import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import BeerDetailsView from './BeerDetailsView';
import { API_URL, BEER_SIMILARITY_MARGIN } from './../../constants';

class BeerDetails extends Component {
  constructor() {
    super();
    this.state = {
      beerData: null,
      similarBeers: null,
      loading: false,
      error: false
    }
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) this.getData();
  }

  getData() {
    this.setState({ loading: true });
    return this.getBeerDetails()
      .then(() => this.getSimilarBeers())
      .catch(() => {
        this.setState({ error: true });
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  }

  getBeerDetails() {
    return axios.get(`${API_URL}/beers/${this.props.id}`)
      .then(results => {
        if (!results.data.length) {
          return this.setState({ error: true });
        }
        return this.setState({ beerData: results.data[0] });
      });
  }

  getSimilarBeers() {
    const { id, ibu, abv, ebc } = this.state.beerData;
    return axios.get(`${API_URL}/beers`, {
      params: {
        abv_gt: this.getValueToCompare(abv, 'gt'),
        abv_lt: this.getValueToCompare(abv, 'lt'),
        ebc_gt: this.getValueToCompare(ebc, 'gt'),
        ebc_lt: this.getValueToCompare(ebc, 'lt'),
        ibu_gt: this.getValueToCompare(ibu, 'gt'),
        ibu_lt: this.getValueToCompare(ibu, 'lt'),
        page: 1,
        per_page: 3
      }
    })
      .then(results => {
        return this.setState({ similarBeers: results.data.filter(beer => beer.id !== id) });
      });
  }

  getValueToCompare(value, type) {
    const sign = type === 'gt' ? -1 : 1;
    return Math.max(Math.round(value + sign * BEER_SIMILARITY_MARGIN), 0);
  }

  render() {
    return (
      <BeerDetailsView
        beerData={this.state.beerData}
        similarBeers={this.state.similarBeers}
        loading={this.state.loading}
        error={this.state.error}
      />
    );
  }
}

BeerDetails.propTypes = {
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default BeerDetails;
