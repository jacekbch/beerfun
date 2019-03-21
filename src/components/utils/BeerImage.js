import React from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image'
import { FaBeer } from 'react-icons/fa';
import Loader from './Loader';
import './BeerImage.scss';

const BeerImage = (props) => (
  <div className="beer-image">
    <Img src={props.src}
      loader={<Loader />}
      unloader={<FaBeer />}
    />
  </div>
      
);

BeerImage.propTypes = {
  src: PropTypes.string
};

export default BeerImage;