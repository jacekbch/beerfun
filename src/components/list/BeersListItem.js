import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import BeerImage from './../utils/BeerImage';
import './BeersListItem.scss';

class BeersListItem extends Component {
  constructor() {
    super();
    this.onBeerClick = this.onBeerClick.bind(this);
  }

  onBeerClick() {
    this.props.history.push(`/${this.props.beerData.id}`);
  }

  render() {
    const { name, tagline, image_url } = this.props.beerData;
    return (
      <div className="beer-list-item" onClick={this.onBeerClick}>
        <BeerImage src={image_url} />
        <div className="name">{ name }</div>
        <div className="tagline">{ tagline }</div>
      </div>
    );
  }
}

BeersListItem.propTypes = {
  beerData: PropTypes.object.isRequired
};

export default withRouter(BeersListItem);
