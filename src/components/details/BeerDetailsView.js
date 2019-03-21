import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SimilarBeers from './SimilarBeers';
import BeerImage from './../utils/BeerImage';
import Loader from './../utils/Loader';
import './BeerDetailsView.scss';

class BeerDetailsView extends Component {
  renderBeerDetails() {
    if (this.props.loading || this.props.error) return null;
    if (!this.props.beerData) return null;

    const {
      name, tagline, description, brewers_tips, ibu, abv, ebc, food_pairing, image_url
    } = this.props.beerData;

    return (
      <div className="beer-details">
        <BeerImage src={image_url} />
        <div className="details">
          <h5>{ name }</h5>
          <div className="tagline">{ tagline }</div>
          <div className="line"></div>
          <ul className="properties">
            <li><b>IBU:</b> { ibu }</li>
            <li><b>ABV:</b> { abv }%</li>
            <li><b>EBC:</b> { ebc }</li>
          </ul>
          <div className="description">
            { description }
          </div>
          <div className="tips">
            <b>Brewers tips:</b>
            <div>{ brewers_tips }</div>
          </div>
          <div className="pairing">
            <b>Best served with:</b>
            <ul>
              {
                food_pairing.map((item, key) => (
                  <li key={key}>- { item }</li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }

  renderSimilarBeers() {
    if (this.props.loading || this.props.error) return null;
    if (!this.props.similarBeers || !this.props.similarBeers.length) return null;
    return <SimilarBeers similarBeers={this.props.similarBeers}></SimilarBeers>;
  }

  renderLoading() {
    if (!this.props.loading) return null;
    return (
      <div className="loader"><Loader /></div>
    );
  }

  renderError() {
    if (!this.props.error) return null;
    return (
      <div className="error">Error retrieving beer's details.</div>
    )
  }

  render() {
    return (
      <div className="beer-details-view">
        { this.renderBeerDetails() }
        { this.renderSimilarBeers() }
        { this.renderLoading() }
        { this.renderError() }
      </div>
    );
  }
}

BeerDetailsView.propTypes = {
  beerData: PropTypes.object,
  similarBeers: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.bool
};

export default BeerDetailsView;
