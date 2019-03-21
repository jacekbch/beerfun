import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import BeerImage from './../utils/BeerImage';
import './SimilarBeers.scss';

class SimilarBeers extends Component {
  onBeerClick(id) {
    this.props.history.push(`/${id}`);
  }

  render() {
    return (
      <div className="similar-beers">
        <b>You may also like:</b>
        <div className="similar-beers-items">
          {
            this.props.similarBeers.map(beer => (
              <div className="beer" key={beer.id} onClick={() => this.onBeerClick(beer.id)}>
                <BeerImage src={beer.image_url} />
                <div className="name">{ beer.name }</div>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}

SimilarBeers.propTypes = {
  similarBeers: PropTypes.array.isRequired
};

export default withRouter(SimilarBeers);
