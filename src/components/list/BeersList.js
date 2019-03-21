import React, { Component } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import BeerListItem from './BeersListItem';
import Loader from './../utils/Loader';
import { API_URL, BEERS_PER_PAGE } from './../../constants';
import './BeersList.scss';

class BeersList extends Component {
  constructor() {
    super();
    this.state = {
      beersList: [],
      hasMore: true,
      error: false
    }
    this.loadBeers = this.loadBeers.bind(this);
  }

  loadBeers(page) {
    if (this.state.error) return;

    return axios.get(`${API_URL}/beers`, {
      params: {
        page: page,
        per_page: BEERS_PER_PAGE
      }
    })
      .then(results => {
        this.setState({
          beersList: [...this.state.beersList, ...results.data],
          hasMore: !!results.data.length
        });
      })
      .catch(() => {
        this.setState({ error: true });
      });
  }

  renderBeersList() {
    if (!this.state.beersList.length) return <></>;
    return (
      <div className="beers-list">
        { this.state.beersList.map(beer => <BeerListItem key={beer.id} beerData={beer}></BeerListItem>) }
      </div>
    );
  }

  renderLoader() {
    if (this.state.error) return null;
    return (
      <div className="loader" key={0}><Loader /></div>
    );
  }

  renderError() {
    if (!this.state.error) return null;
    return (
      <div className="error">Error retrieving beers.</div>
    );
  }

  render() {
    return (
      <div className="beers-list-component">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadBeers}
          hasMore={this.state.hasMore}
          loader={this.renderLoader()}
        >
          { this.renderBeersList() }
        </InfiniteScroll>
        { this.renderError() }
      </div>
    );
  }
}

export default BeersList;
